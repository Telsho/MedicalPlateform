using AuthJWT.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AuthJWT.Services.Interfaces
{
    public interface IConnectionService
    {
        public void LoginHubUser(UserHub user);
        public void LoginInCallUser(string connectionId, string name);
        public UserHub LogoutHubUser(string name);
        public string LogoutInCallUser(string name);
        public IEnumerable<UserHub> GetHubUsersByRole(string role);
        public IEnumerable<UserHub> GetAllHubUsers();
        public UserHub GetHubUserByName(string name);
        public string GetInCallUserIdByName(string name);
    }
}
