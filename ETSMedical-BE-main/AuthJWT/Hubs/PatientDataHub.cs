using AuthJWT.Models;
using AuthJWT.Models.Dtos;
using AuthJWT.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AuthJWT.Hubs
{
    [Authorize]
    public class PatientDataHub : Hub
    {
        IConnectionService _connectionService;

        public PatientDataHub(IConnectionService connectionService, UserManager<ApplicationUser> userManager)
        {
            _connectionService = connectionService;
        }

        public void Login()
        {
            _connectionService.LoginInCallUser(Context.ConnectionId, Context.User.Identity.Name);
        }

        public async Task SendData(string doctorName, float temperature, float heartbeat)
        {
            var connectionId = _connectionService.GetInCallUserIdByName(doctorName);
            if (connectionId == null)
                throw new Exception("User is not connected");

            await Clients.Client(connectionId).SendAsync("transferTemperature", temperature);
            await Clients.Client(connectionId).SendAsync("transferHeartbeat", heartbeat);
        }


        public override async Task OnDisconnectedAsync(Exception exception)
        {
            var user = _connectionService.LogoutInCallUser(Context.User.Identity.Name);

            await base.OnDisconnectedAsync(exception);
        }

    }
}
