using AuthJWT.Models;
using AuthJWT.Services.Interfaces;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Security.Principal;
using System.Threading.Tasks;

namespace AuthJWT.Services
{
    public class ConnectionService : IConnectionService
    {
        public IEnumerable<UserHub> GetHubUsersByRole(string role)
        {
            return Connections.HubUsers.Select(u => u.Value).Where(u => u.Role == role).ToArray();
        }
        public IEnumerable<UserHub> GetAllHubUsers()
        {
            return Connections.HubUsers.Select(u => u.Value).ToArray();
        }

        public void LoginHubUser(UserHub user)
        {
            Connections.HubUsers.AddOrUpdate(user.UserName, user, (k , v) => user);
        }

        public UserHub LogoutHubUser(string name)
        {
            UserHub value;
            Connections.HubUsers.TryRemove(name, out value);

            return value;
        }

        public UserHub GetHubUserByName(string name)
        {
            UserHub user;
            if (Connections.HubUsers.TryGetValue(name, out user))
                return user;
            else
                throw new Exception("Can't find user " + name);
        }

        public void LoginInCallUser(string connectionId, string name)
        {
            Connections.InCallUsers.AddOrUpdate(name, connectionId, (k, v) => connectionId);

        }

        public string LogoutInCallUser(string name)
        {
            string value;
            Connections.InCallUsers.TryRemove(name, out value);

            return value;
        }

        public string GetInCallUserIdByName(string name)
        {
            string connectionId;
            if (Connections.InCallUsers.TryGetValue(name, out connectionId))
                return connectionId;
            else
                throw new Exception("Can't find user " + name);
        }
    }
}

public static class Connections
{
    static Connections()
    {
        HubUsers = new ConcurrentDictionary<string, UserHub>();
        InCallUsers = new ConcurrentDictionary<string, string>();
    }

    public static ConcurrentDictionary<string,UserHub> HubUsers{ get; set; }
    public static ConcurrentDictionary<string,string> InCallUsers { get; set; }
}
