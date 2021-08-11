using Microsoft.EntityFrameworkCore.Migrations;

namespace Backend.Migrations
{
    public partial class V3 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Knjige_Polica_PripadaPolicaId",
                table: "Knjige");

            migrationBuilder.AddForeignKey(
                name: "FK_Knjige_Polica_PripadaPolicaId",
                table: "Knjige",
                column: "PripadaPolicaId",
                principalTable: "Polica",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Knjige_Polica_PripadaPolicaId",
                table: "Knjige");

            migrationBuilder.AddForeignKey(
                name: "FK_Knjige_Polica_PripadaPolicaId",
                table: "Knjige",
                column: "PripadaPolicaId",
                principalTable: "Polica",
                principalColumn: "ID",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
