using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TarifasAPI.Migrations
{
    /// <inheritdoc />
    public partial class ModificacionCampos : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_EmpresaImportes_Empresas_EmpresaId",
                table: "EmpresaImportes");

            migrationBuilder.DropForeignKey(
                name: "FK_EmpresaPeriodos_Empresas_EmpresaId",
                table: "EmpresaPeriodos");

            migrationBuilder.DropForeignKey(
                name: "FK_EmpresaTrabajadores_Empresas_EmpresaId",
                table: "EmpresaTrabajadores");

            migrationBuilder.DropIndex(
                name: "IX_EmpresaTrabajadores_EmpresaId",
                table: "EmpresaTrabajadores");

            migrationBuilder.DropIndex(
                name: "IX_EmpresaPeriodos_EmpresaId",
                table: "EmpresaPeriodos");

            migrationBuilder.DropIndex(
                name: "IX_EmpresaImportes_EmpresaId",
                table: "EmpresaImportes");

            migrationBuilder.DropColumn(
                name: "IdEmpresa",
                table: "EmpresaImportes");

            migrationBuilder.AlterColumn<DateOnly>(
                name: "DesdeFecha",
                table: "Tarifas",
                type: "date",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "datetime2");

            migrationBuilder.AlterColumn<int>(
                name: "EmpresaId",
                table: "EmpresaImportes",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<DateTime>(
                name: "DesdeFecha",
                table: "Tarifas",
                type: "datetime2",
                nullable: false,
                oldClrType: typeof(DateOnly),
                oldType: "date");

            migrationBuilder.AlterColumn<int>(
                name: "EmpresaId",
                table: "EmpresaImportes",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddColumn<int>(
                name: "IdEmpresa",
                table: "EmpresaImportes",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_EmpresaTrabajadores_EmpresaId",
                table: "EmpresaTrabajadores",
                column: "EmpresaId");

            migrationBuilder.CreateIndex(
                name: "IX_EmpresaPeriodos_EmpresaId",
                table: "EmpresaPeriodos",
                column: "EmpresaId");

            migrationBuilder.CreateIndex(
                name: "IX_EmpresaImportes_EmpresaId",
                table: "EmpresaImportes",
                column: "EmpresaId");

            migrationBuilder.AddForeignKey(
                name: "FK_EmpresaImportes_Empresas_EmpresaId",
                table: "EmpresaImportes",
                column: "EmpresaId",
                principalTable: "Empresas",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_EmpresaPeriodos_Empresas_EmpresaId",
                table: "EmpresaPeriodos",
                column: "EmpresaId",
                principalTable: "Empresas",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_EmpresaTrabajadores_Empresas_EmpresaId",
                table: "EmpresaTrabajadores",
                column: "EmpresaId",
                principalTable: "Empresas",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
