using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LeaveManagement.API.Migrations
{
    /// <inheritdoc />
    public partial class AddHolidayIdentity : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_Holidays",
                table: "Holidays");

            migrationBuilder.AddColumn<int>(
                name: "Id",
                table: "Holidays",
                type: "int",
                nullable: false,
                defaultValue: 0)
                .Annotation("SqlServer:Identity", "1, 1");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Holidays",
                table: "Holidays",
                column: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_Holidays",
                table: "Holidays");

            migrationBuilder.DropColumn(
                name: "Id",
                table: "Holidays");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Holidays",
                table: "Holidays",
                column: "Date");
        }
    }
}
