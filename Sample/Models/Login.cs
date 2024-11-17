namespace Sample.Models
{
    public class Login
    {
        public int id { get; set; }
        public Guid? userId { get; set; }
        public string Name { get; set; }
        public string user_name { get; set; }
        public string password { get; set; }
        public string Hashed_password { get; set; }
        public string Email { get; set; }
        public string PhoneNo { get; set; }
        public string user_type { get; set; }
    }
}
