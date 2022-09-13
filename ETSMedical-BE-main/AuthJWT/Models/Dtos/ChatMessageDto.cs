using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AuthJWT.Models.Dtos
{
    public class ChatMessageDto
    {
        public string Timestamp { get; set; }
        public UserHub User { get; set; }
        public string Message { get; set; }
    }
}
