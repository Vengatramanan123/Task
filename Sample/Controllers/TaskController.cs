using ClosedXML.Excel;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OfficeOpenXml;
using OfficeOpenXml.FormulaParsing.Excel.Functions.Math;
using Sample.Data;
using Sample.Models;
using System.Data;
using System.Threading;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace Sample.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TaskController : ControllerBase
    {
        private readonly ApplicationDbContext _task;
        private readonly ApplicationDbContext _login;


        public TaskController(ApplicationDbContext task,ApplicationDbContext user)
        {
            _task = task;
            _login = user;
        }
        [HttpPost("AddTask")]
        public IActionResult AddTask(OverallModel addtask)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            else
            {
                _task.OverallModel.Add(new OverallModel
                {
                    taskId = Guid.NewGuid(),
                    task = addtask.task,
                    Date = addtask.Date,
                    category = addtask.category,
                    assignedTo = addtask.assignedTo,
                    timeTaken = addtask.timeTaken,
                    actualDate = addtask.actualDate,
                    status = addtask.status,
                    priority = addtask.priority
                });
                _task.SaveChanges();
            }

            return Ok("Task Added Successfully!!!");
        }

        [HttpGet("Tasks")]
        public IActionResult Tasks()
        {
            var tasks = _task.OverallModel.ToList();
            return Ok(tasks);
        }
        [HttpGet("TaskCount")]
        public IActionResult TaskCount()
        {
            var total = _task.OverallModel.Count();
            var OpenTask = _task.OverallModel.Count(t => t.status == "Open");
            var CloseTask = _task.OverallModel.Count(h => h.status == "Close");
            var taskcounts = new object[]
            {
               new { taskType = "Total", count = total },
               new { taskType = "Open", count = OpenTask },
               new { taskType = "Close", count = CloseTask }
            };
            return Ok(taskcounts);
        }
        [HttpGet("GetTask/{id}")]
        public IActionResult GetTask(int id)
        {
            var task = _task.OverallModel.FirstOrDefault(y => y.Id == id);
            if (task != null)
            {
                return Ok(task);
            }
            else
            {
                return NoContent();
            }
        }

        [HttpPost("UpdateTask/{id}")]
        public IActionResult UpdateTask(int id, OverallModel addtask)
        {
            var updateTask = _task.OverallModel.FirstOrDefault(e => e.Id == id);
            if (updateTask != null)
            {
                if (ModelState.IsValid)
                {

                    updateTask.task = addtask.task;
                    updateTask.Date = addtask.Date;
                    updateTask.category = addtask.category;
                    updateTask.assignedTo = addtask.assignedTo;
                    updateTask.timeTaken = addtask.timeTaken;
                    updateTask.actualDate = addtask.actualDate;
                    updateTask.status = addtask.status;
                    updateTask.priority = addtask.priority;

                    _task.OverallModel.Update(updateTask);
                    _task.SaveChanges();
                }
            }
            else
            {
                return BadRequest();
            }
            return Ok("Task Updated Successfully !!!");
        }

        [HttpPost("Transfer/{id}")]
        public IActionResult Transfer([FromRoute]int id,[FromBody]OverallModel transfer)
        {
            var userRecord = _task.OverallModel.FirstOrDefault(v => v.Id == id);
           
           if(userRecord != null)
           {
                if (ModelState.IsValid)
                {
                    userRecord.assignedTo = Convert.ToString(id);
                    _task.OverallModel.Update(userRecord);
                    _task.SaveChanges();
                }
           }
            else
            {
                return BadRequest();
            }
            return Ok("Task Transfered Sucessfully");
        }

        //Using EPPLUS
        [HttpPost("Export")]
        public async Task<IActionResult> Export(OverallModel export)
        {
            var tasks = await _task.OverallModel.ToListAsync();

            using(var package = new ExcelPackage())
            {
                var worksheet = package.Workbook.Worksheets.Add("Sheet1");
                worksheet.Cells["A1"].Value = "Id";
                worksheet.Cells["B1"].Value = "Date";
                worksheet.Cells["C1"].Value = "Category";
                worksheet.Cells["D1"].Value = "Actual Date";
                worksheet.Cells["E1"].Value = "Assigned To";
                worksheet.Cells["F1"].Value = "Task";
                worksheet.Cells["G1"].Value = "Duration";
                worksheet.Cells["H1"].Value = "Status";
                worksheet.Cells["I1"].Value = "Priority";

                int row = 2;

                foreach(var task in tasks)
                {
                    worksheet.Cells[row, 1].Value = task.Id;
                    worksheet.Cells[row, 2].Value = task.Date;
                    worksheet.Cells[row, 3].Value = task.category;
                    worksheet.Cells[row, 4].Value = task.actualDate;
                    worksheet.Cells[row, 5].Value = task.assignedTo;
                    worksheet.Cells[row, 6].Value = task.task;
                    worksheet.Cells[row, 7].Value = task.timeTaken;
                    worksheet.Cells[row, 8].Value = task.status;
                    worksheet.Cells[row, 9].Value = task.priority;
                    row++;
                }

                worksheet.Cells["A:I"].AutoFitColumns();

                var stream = new MemoryStream();
                package.SaveAs(stream);
                stream.Position = 0;

                string excelName = "Tasks-{DateTime.Now:yyyyMMddHHmmss}.xlsx";
                return File(stream, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", excelName);
            }
        }

        //Using ClosedXML Or XLWorkbook
        [HttpPost("ExportTask")]
        public async Task<IActionResult> ExportTask()
        {
            var tasks = await _task.OverallModel.ToListAsync();
            var fileName = "Task.xlsx";
            return GenerateExcel(fileName, tasks);
        }

        private FileResult GenerateExcel(string fileName,IEnumerable<OverallModel> tasks)
        {
            
            DataTable table = new DataTable("Tasks");
            table.Columns.AddRange(new DataColumn[]
            {
                new DataColumn("Id"),
                new DataColumn("Date"),
                new DataColumn("Task"),
                new DataColumn("Duration"),
                new DataColumn("Assigned Person"),
            });

            foreach(var task in tasks)
            {
                table.Rows.Add(task.Id,task.Date,task.task,task.timeTaken,task.assignedTo);
            }

            using (XLWorkbook wb = new XLWorkbook())
            {
                wb.Worksheets.Add(table);
                using (MemoryStream stream= new MemoryStream())
                {
                    wb.SaveAs(stream);
                    return File(stream.ToArray(), "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", fileName);

                }
            };
        }
    }
}
