namespace Sample.Models
{
    public class OverallModel
    {
        public int? Id { get; set; }
        public Guid? taskId { get; set; }
        public string? Date { get; set; }
        public string? category { get; set; }
        public string? actualDate { get; set; }
        public string? assignedTo { get; set; }
        public string? task { get; set; }
        public string? timeTaken { get; set; }
        public string? status { get; set; }
        public string? priority { get; set; }
    }
}
