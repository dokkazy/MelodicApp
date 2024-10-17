﻿// <auto-generated />
using System;
using Infrastructure.Database;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace Infrastructure.Migrations
{
    [DbContext(typeof(MelodicDbContext))]
    [Migration("20241017032222_Initial")]
    partial class Initial
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.10")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("Domain.Entities.Brand", b =>
                {
                    b.Property<Guid>("BrandId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime2");

                    b.Property<string>("CreatedBy")
                        .HasColumnType("nvarchar(max)");

                    b.Property<byte>("DelFlg")
                        .HasColumnType("tinyint");

                    b.Property<DateTime?>("LastModified")
                        .HasColumnType("datetime2");

                    b.Property<string>("LastModifiedBy")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("BrandId");

                    b.ToTable("Brand");

                    b.HasData(
                        new
                        {
                            BrandId = new Guid("f27effce-038f-4253-a632-14aa0acc89ca"),
                            CreatedAt = new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            DelFlg = (byte)0,
                            Name = "JBL"
                        },
                        new
                        {
                            BrandId = new Guid("f8c6cc19-38e0-4867-8216-43092f01af05"),
                            CreatedAt = new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            DelFlg = (byte)0,
                            Name = "Logitech"
                        },
                        new
                        {
                            BrandId = new Guid("db66c4f6-162c-4f56-a8b9-0832bd3a81f2"),
                            CreatedAt = new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            DelFlg = (byte)0,
                            Name = "Sony"
                        },
                        new
                        {
                            BrandId = new Guid("8b0eac64-c224-4a6f-9971-d875e1fac9fe"),
                            CreatedAt = new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            DelFlg = (byte)0,
                            Name = "Nanomax"
                        });
                });

            modelBuilder.Entity("Domain.Entities.Cart", b =>
                {
                    b.Property<Guid>("UserId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("SpeakerId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime2");

                    b.Property<string>("CreatedBy")
                        .HasColumnType("nvarchar(max)");

                    b.Property<byte>("DelFlg")
                        .HasColumnType("tinyint");

                    b.Property<DateTime?>("LastModified")
                        .HasColumnType("datetime2");

                    b.Property<string>("LastModifiedBy")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("Quantity")
                        .HasColumnType("int");

                    b.HasKey("UserId", "SpeakerId");

                    b.ToTable("Cart");
                });

            modelBuilder.Entity("Domain.Entities.EVoucher", b =>
                {
                    b.Property<Guid>("VoucherId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Code")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime2");

                    b.Property<string>("CreatedBy")
                        .HasColumnType("nvarchar(max)");

                    b.Property<byte>("DelFlg")
                        .HasColumnType("tinyint");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime?>("LastModified")
                        .HasColumnType("datetime2");

                    b.Property<string>("LastModifiedBy")
                        .HasColumnType("nvarchar(max)");

                    b.Property<double>("Percent")
                        .HasColumnType("float");

                    b.Property<string>("VouncherName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("VoucherId");

                    b.ToTable("EVoucher");

                    b.HasData(
                        new
                        {
                            VoucherId = new Guid("e09f2a37-f53e-4aad-8dba-35be56184c50"),
                            Code = "EVOUNCHERKM5%",
                            CreatedAt = new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            DelFlg = (byte)0,
                            Description = "Discount 5% for speaker",
                            Percent = 0.5,
                            VouncherName = "KM5%"
                        },
                        new
                        {
                            VoucherId = new Guid("da20e3e7-a8f6-4ace-abee-3f03436d33d2"),
                            Code = "EVOUNCHERKM10%",
                            CreatedAt = new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            DelFlg = (byte)0,
                            Description = "Discount 10% for speaker",
                            Percent = 0.10000000000000001,
                            VouncherName = "KM10%"
                        },
                        new
                        {
                            VoucherId = new Guid("e9cf62f1-bdde-48c3-a3a0-58bc7696ad7a"),
                            Code = "EVOUNCHERKM15%",
                            CreatedAt = new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            DelFlg = (byte)0,
                            Description = "Discount 15% for speaker",
                            Percent = 0.14999999999999999,
                            VouncherName = "KM15%"
                        },
                        new
                        {
                            VoucherId = new Guid("a723d28b-24d6-4c58-9e3a-0bdcb93580d2"),
                            Code = "EVOUNCHERKM20%",
                            CreatedAt = new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            DelFlg = (byte)0,
                            Description = "Discount 20% for speaker",
                            Percent = 0.20000000000000001,
                            VouncherName = "KM20%"
                        },
                        new
                        {
                            VoucherId = new Guid("bf712960-13f1-4be0-a34b-8f53a1095faf"),
                            Code = "EVOUNCHERKM25%",
                            CreatedAt = new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            DelFlg = (byte)0,
                            Description = "Discount 25% for speaker",
                            Percent = 0.25,
                            VouncherName = "KM25%"
                        });
                });

            modelBuilder.Entity("Domain.Entities.Order", b =>
                {
                    b.Property<Guid>("OrderId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Address")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime2");

                    b.Property<string>("CreatedBy")
                        .HasColumnType("nvarchar(max)");

                    b.Property<byte>("DelFlg")
                        .HasColumnType("tinyint");

                    b.Property<double?>("Discount")
                        .HasColumnType("float");

                    b.Property<string>("FullName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime?>("LastModified")
                        .HasColumnType("datetime2");

                    b.Property<string>("LastModifiedBy")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Payment")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PhoneNumber")
                        .HasColumnType("nvarchar(max)");

                    b.Property<double?>("Tax")
                        .HasColumnType("float");

                    b.Property<double?>("Total")
                        .HasColumnType("float");

                    b.Property<double?>("TotalPrice")
                        .HasColumnType("float");

                    b.Property<Guid?>("UserId")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("OrderId");

                    b.ToTable("Order");
                });

            modelBuilder.Entity("Domain.Entities.OrderDetail", b =>
                {
                    b.Property<Guid>("OrderId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("SpeakerId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime2");

                    b.Property<string>("CreatedBy")
                        .HasColumnType("nvarchar(max)");

                    b.Property<byte>("DelFlg")
                        .HasColumnType("tinyint");

                    b.Property<DateTime?>("LastModified")
                        .HasColumnType("datetime2");

                    b.Property<string>("LastModifiedBy")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("Quantity")
                        .HasColumnType("int");

                    b.HasKey("OrderId", "SpeakerId");

                    b.HasIndex("SpeakerId");

                    b.ToTable("OrderDetail");
                });

            modelBuilder.Entity("Domain.Entities.Speaker", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("BrandId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime2");

                    b.Property<string>("CreatedBy")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Decription")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<byte>("DelFlg")
                        .HasColumnType("tinyint");

                    b.Property<string>("Img")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime?>("LastModified")
                        .HasColumnType("datetime2");

                    b.Property<string>("LastModifiedBy")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<double>("Price")
                        .HasColumnType("float");

                    b.Property<int?>("UnitInStock")
                        .IsRequired()
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("BrandId");

                    b.ToTable("Speaker");

                    b.HasData(
                        new
                        {
                            Id = new Guid("8abe03f8-bfc0-42b0-8a69-850826a14db4"),
                            BrandId = new Guid("f8c6cc19-38e0-4867-8216-43092f01af05"),
                            CreatedAt = new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            Decription = "Portable Bluetooth speaker with light show",
                            DelFlg = (byte)0,
                            Img = "https://cdn.tgdd.vn/Products/Images/2162/249767/sony-srs-xb13-150323-031134-600x600.jpg",
                            Name = "Sony SRS-XB13",
                            Price = 950000.0,
                            UnitInStock = 10
                        });
                });

            modelBuilder.Entity("Domain.ValueObjects.Payment", b =>
                {
                    b.Property<string>("CVV")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("CardNumber")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ExpiryDate")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("FullName")
                        .HasColumnType("nvarchar(max)");

                    b.ToTable("Payment");
                });

            modelBuilder.Entity("Domain.Entities.OrderDetail", b =>
                {
                    b.HasOne("Domain.Entities.Order", "Order")
                        .WithMany("OrderDetails")
                        .HasForeignKey("OrderId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Domain.Entities.Speaker", "Speaker")
                        .WithMany("OrderDetails")
                        .HasForeignKey("SpeakerId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Order");

                    b.Navigation("Speaker");
                });

            modelBuilder.Entity("Domain.Entities.Speaker", b =>
                {
                    b.HasOne("Domain.Entities.Brand", "Brand")
                        .WithMany()
                        .HasForeignKey("BrandId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Brand");
                });

            modelBuilder.Entity("Domain.Entities.Order", b =>
                {
                    b.Navigation("OrderDetails");
                });

            modelBuilder.Entity("Domain.Entities.Speaker", b =>
                {
                    b.Navigation("OrderDetails");
                });
#pragma warning restore 612, 618
        }
    }
}