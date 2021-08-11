using Microsoft.EntityFrameworkCore.Migrations;

namespace Backend.Migrations
{
    public partial class V2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Boja",
                table: "Knjige",
                type: "nvarchar(30)",
                maxLength: 30,
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Boja",
                table: "Knjige");
        }
    }
}
