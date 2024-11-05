using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TarifasAPI.Migrations
{
    /// <inheritdoc />
    public partial class Tablasmodificacion : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "HastaFecha",
                table: "Tarifas");

            migrationBuilder.DropColumn(
                name: "HastaTrabajador",
                table: "Tarifas");

            migrationBuilder.CreateTable(
                name: "EmpresaImportes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IdEmpresa = table.Column<int>(type: "int", nullable: false),
                    Fecha = table.Column<DateOnly>(type: "date", nullable: false),
                    Importe = table.Column<float>(type: "real", nullable: false),
                    EmpresaId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EmpresaImportes", x => x.Id);
                    table.ForeignKey(
                        name: "FK_EmpresaImportes_Empresas_EmpresaId",
                        column: x => x.EmpresaId,
                        principalTable: "Empresas",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "EmpresaPeriodos",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    EmpresaId = table.Column<int>(type: "int", nullable: false),
                    DesdeFecha = table.Column<DateOnly>(type: "date", nullable: false),
                    HastaFecha = table.Column<DateOnly>(type: "date", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EmpresaPeriodos", x => x.Id);
                    table.ForeignKey(
                        name: "FK_EmpresaPeriodos_Empresas_EmpresaId",
                        column: x => x.EmpresaId,
                        principalTable: "Empresas",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "EmpresaTrabajadores",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    EmpresaId = table.Column<int>(type: "int", nullable: false),
                    Fecha = table.Column<DateOnly>(type: "date", nullable: false),
                    NumeroTrabajadores = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EmpresaTrabajadores", x => x.Id);
                    table.ForeignKey(
                        name: "FK_EmpresaTrabajadores_Empresas_EmpresaId",
                        column: x => x.EmpresaId,
                        principalTable: "Empresas",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_EmpresaImportes_EmpresaId",
                table: "EmpresaImportes",
                column: "EmpresaId");

            migrationBuilder.CreateIndex(
                name: "IX_EmpresaPeriodos_EmpresaId",
                table: "EmpresaPeriodos",
                column: "EmpresaId");

            migrationBuilder.CreateIndex(
                name: "IX_EmpresaTrabajadores_EmpresaId",
                table: "EmpresaTrabajadores",
                column: "EmpresaId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "EmpresaImportes");

            migrationBuilder.DropTable(
                name: "EmpresaPeriodos");

            migrationBuilder.DropTable(
                name: "EmpresaTrabajadores");

            migrationBuilder.AddColumn<DateTime>(
                name: "HastaFecha",
                table: "Tarifas",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "HastaTrabajador",
                table: "Tarifas",
                type: "int",
                nullable: true);
        }
    }
}
