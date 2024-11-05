﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using TarifasAPI;

#nullable disable

namespace TarifasAPI.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    [Migration("20241104152950_Tablasmodificacion")]
    partial class Tablasmodificacion
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.10")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("TarifasAPI.Entidades.Empresa", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Contacto")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Nombre")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Telefono")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Empresas");
                });

            modelBuilder.Entity("TarifasAPI.Entidades.EmpresaImporte", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int?>("EmpresaId")
                        .HasColumnType("int");

                    b.Property<DateOnly>("Fecha")
                        .HasColumnType("date");

                    b.Property<int>("IdEmpresa")
                        .HasColumnType("int");

                    b.Property<float>("Importe")
                        .HasColumnType("real");

                    b.HasKey("Id");

                    b.HasIndex("EmpresaId");

                    b.ToTable("EmpresaImportes");
                });

            modelBuilder.Entity("TarifasAPI.Entidades.EmpresaPeriodo", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<DateOnly>("DesdeFecha")
                        .HasColumnType("date");

                    b.Property<int>("EmpresaId")
                        .HasColumnType("int");

                    b.Property<DateOnly>("HastaFecha")
                        .HasColumnType("date");

                    b.HasKey("Id");

                    b.HasIndex("EmpresaId");

                    b.ToTable("EmpresaPeriodos");
                });

            modelBuilder.Entity("TarifasAPI.Entidades.EmpresaTrabajadores", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("EmpresaId")
                        .HasColumnType("int");

                    b.Property<DateOnly>("Fecha")
                        .HasColumnType("date");

                    b.Property<int>("NumeroTrabajadores")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("EmpresaId");

                    b.ToTable("EmpresaTrabajadores");
                });

            modelBuilder.Entity("TarifasAPI.Entidades.Tarifa", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<DateTime>("DesdeFecha")
                        .HasColumnType("datetime2");

                    b.Property<int>("DesdeTrabajador")
                        .HasColumnType("int");

                    b.Property<decimal>("ImporteTrabajadorDia")
                        .HasColumnType("decimal(18,2)");

                    b.HasKey("Id");

                    b.ToTable("Tarifas");
                });

            modelBuilder.Entity("TarifasAPI.Entidades.EmpresaImporte", b =>
                {
                    b.HasOne("TarifasAPI.Entidades.Empresa", null)
                        .WithMany("EmpresaImportes")
                        .HasForeignKey("EmpresaId");
                });

            modelBuilder.Entity("TarifasAPI.Entidades.EmpresaPeriodo", b =>
                {
                    b.HasOne("TarifasAPI.Entidades.Empresa", null)
                        .WithMany("EmpresaPeriodos")
                        .HasForeignKey("EmpresaId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("TarifasAPI.Entidades.EmpresaTrabajadores", b =>
                {
                    b.HasOne("TarifasAPI.Entidades.Empresa", null)
                        .WithMany("EmpresaTrabajadores")
                        .HasForeignKey("EmpresaId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("TarifasAPI.Entidades.Empresa", b =>
                {
                    b.Navigation("EmpresaImportes");

                    b.Navigation("EmpresaPeriodos");

                    b.Navigation("EmpresaTrabajadores");
                });
#pragma warning restore 612, 618
        }
    }
}