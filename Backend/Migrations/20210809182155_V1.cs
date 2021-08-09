using Microsoft.EntityFrameworkCore.Migrations;

namespace Backend.Migrations
{
    public partial class V1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Biblioteka",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Ime = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    Adresa = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    BrojKnjiga = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Biblioteka", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Polica",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Slovo = table.Column<string>(type: "nvarchar(1)", maxLength: 1, nullable: true),
                    PripadaBiblioteciId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Polica", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Polica_Biblioteka_PripadaBiblioteciId",
                        column: x => x.PripadaBiblioteciId,
                        principalTable: "Biblioteka",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Knjige",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Naslov = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    Autor = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    Slika = table.Column<string>(type: "nvarchar(300)", maxLength: 300, nullable: true),
                    GodinaIzdanja = table.Column<int>(type: "int", nullable: false),
                    PripadaPolicaId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Knjige", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Knjige_Polica_PripadaPolicaId",
                        column: x => x.PripadaPolicaId,
                        principalTable: "Polica",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Knjige_PripadaPolicaId",
                table: "Knjige",
                column: "PripadaPolicaId");

            migrationBuilder.CreateIndex(
                name: "IX_Polica_PripadaBiblioteciId",
                table: "Polica",
                column: "PripadaBiblioteciId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Knjige");

            migrationBuilder.DropTable(
                name: "Polica");

            migrationBuilder.DropTable(
                name: "Biblioteka");
        }
    }
}
