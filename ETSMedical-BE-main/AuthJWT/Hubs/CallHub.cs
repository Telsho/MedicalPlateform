using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using AuthJWT.Models;
using AuthJWT.Models.Dtos;
using AuthJWT.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.SignalR;

namespace AuthJWT.Hubs
{
    [Authorize]
    public class CallHub : Hub
    {
        UserManager<ApplicationUser> _userManager;
        IConnectionService _connectionService;

        public CallHub(UserManager<ApplicationUser> userManager, IConnectionService connectionService)
        {
            _connectionService = connectionService;
            _userManager = userManager;
        }

        public async Task Login()
        {
            var user = await _userManager.FindByNameAsync(Context.User.Identity.Name);
            var hubUser = new UserHub() { UserName = Context.User.Identity.Name, ConnectionId = Context.ConnectionId, Role = user.Role };
            _connectionService.LoginHubUser(hubUser);
            
            var allUsers = _connectionService.GetAllHubUsers();

            if (user.Role == "Patient")
            {
                await Clients.Client(Context.ConnectionId)
                    .SendAsync("UpdateUserList", JsonSerializer.Serialize(allUsers.Where(u => u.Role == "Doctor").ToArray()));

                await Clients.Clients(allUsers.Where(u => u.Role != "Patient").Select(u => u.ConnectionId).ToArray())
                    .SendAsync("NewUserArrived", JsonSerializer.Serialize(hubUser));
            }
            else
            {
                await Clients.Client(Context.ConnectionId)
                    .SendAsync("UpdateUserList", JsonSerializer.Serialize(allUsers.Where(u => u.ConnectionId != Context.ConnectionId).ToArray()));

                if (user.Role == "Doctor")
                    await Clients.AllExcept(Context.ConnectionId).SendAsync("NewUserArrived", JsonSerializer.Serialize(hubUser));
            }


        }

        public async Task CallUser(UserHub callUser)
        {
            var currentUser = _connectionService.GetHubUserByName(Context.User.Identity.Name);
            await Clients.Client(callUser.ConnectionId).SendAsync("CallRequest", currentUser);            
        }
        public async Task SendMessage(string message)
        {
            var formatedMessage = new ChatMessageDto()
            {
                Message = message,
                Timestamp = DateTime.Now.ToString("HH:mm:ss tt"),
                User = new UserHub() { 
                    UserName = Context.User.Identity.Name,
                    Role = Context.User.Identities.First().Claims.ToArray()[1].Value 
                }
            };

            await Clients.All.SendAsync("NewMessage", JsonSerializer.Serialize(formatedMessage));            
        }

        public async Task SendSignal(string signal, string user)
        {
            await Clients.Client(user).SendAsync("SendSignal", Context.ConnectionId, signal);
        }
        public async Task CallRequest(UserHub calledUser)
        {
            var currentUser = _connectionService.GetHubUserByName(Context.User.Identity.Name);
            await Clients.Client(calledUser.ConnectionId).SendAsync("UserIsCalling", currentUser);
        }
        public async Task CallAccepted(UserHub calledUser)
        {
            var currentUser = _connectionService.GetHubUserByName(Context.User.Identity.Name);
            await Clients.Client(calledUser.ConnectionId).SendAsync("CallAccepted", currentUser);
        }

        public override async Task OnDisconnectedAsync(Exception exception)
        {
            var user = _connectionService.LogoutHubUser(Context.User.Identity.Name);
            await Clients.All.SendAsync("DisconnectedUser", user);

            await base.OnDisconnectedAsync(exception);
        }

        


    }
}
