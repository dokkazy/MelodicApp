using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class Initial : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Brand",
                columns: table => new
                {
                    BrandId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedBy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LastModified = table.Column<DateTime>(type: "datetime2", nullable: true),
                    LastModifiedBy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DelFlg = table.Column<byte>(type: "tinyint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Brand", x => x.BrandId);
                });

            migrationBuilder.CreateTable(
                name: "Cart",
                columns: table => new
                {
                    UserId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    SpeakerId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Quantity = table.Column<int>(type: "int", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedBy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LastModified = table.Column<DateTime>(type: "datetime2", nullable: true),
                    LastModifiedBy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DelFlg = table.Column<byte>(type: "tinyint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Cart", x => new { x.UserId, x.SpeakerId });
                });

            migrationBuilder.CreateTable(
                name: "EVoucher",
                columns: table => new
                {
                    VoucherId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Code = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    VouncherName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Percent = table.Column<double>(type: "float", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedBy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LastModified = table.Column<DateTime>(type: "datetime2", nullable: true),
                    LastModifiedBy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DelFlg = table.Column<byte>(type: "tinyint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EVoucher", x => x.VoucherId);
                });

            migrationBuilder.CreateTable(
                name: "Order",
                columns: table => new
                {
                    OrderId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    UserId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    FullName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Address = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Tax = table.Column<double>(type: "float", nullable: true),
                    Discount = table.Column<double>(type: "float", nullable: true),
                    Total = table.Column<double>(type: "float", nullable: true),
                    TotalPrice = table.Column<double>(type: "float", nullable: true),
                    Payment = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PhoneNumber = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedBy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LastModified = table.Column<DateTime>(type: "datetime2", nullable: true),
                    LastModifiedBy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DelFlg = table.Column<byte>(type: "tinyint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Order", x => x.OrderId);
                });

            migrationBuilder.CreateTable(
                name: "Payment",
                columns: table => new
                {
                    FullName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CardNumber = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CVV = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ExpiryDate = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                });

            migrationBuilder.CreateTable(
                name: "Speaker",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    BrandId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Price = table.Column<double>(type: "float", nullable: false),
                    Decription = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    UnitInStock = table.Column<int>(type: "int", nullable: false),
                    Img = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedBy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LastModified = table.Column<DateTime>(type: "datetime2", nullable: true),
                    LastModifiedBy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DelFlg = table.Column<byte>(type: "tinyint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Speaker", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Speaker_Brand_BrandId",
                        column: x => x.BrandId,
                        principalTable: "Brand",
                        principalColumn: "BrandId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "OrderDetail",
                columns: table => new
                {
                    SpeakerId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    OrderId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Quantity = table.Column<int>(type: "int", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedBy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LastModified = table.Column<DateTime>(type: "datetime2", nullable: true),
                    LastModifiedBy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DelFlg = table.Column<byte>(type: "tinyint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OrderDetail", x => new { x.OrderId, x.SpeakerId });
                    table.ForeignKey(
                        name: "FK_OrderDetail_Order_OrderId",
                        column: x => x.OrderId,
                        principalTable: "Order",
                        principalColumn: "OrderId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_OrderDetail_Speaker_SpeakerId",
                        column: x => x.SpeakerId,
                        principalTable: "Speaker",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Brand",
                columns: new[] { "BrandId", "CreatedAt", "CreatedBy", "DelFlg", "LastModified", "LastModifiedBy", "Name" },
                values: new object[,]
                {
                    { new Guid("8b0eac64-c224-4a6f-9971-d875e1fac9fe"), new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), null, (byte)0, null, null, "Nanomax" },
                    { new Guid("db66c4f6-162c-4f56-a8b9-0832bd3a81f2"), new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), null, (byte)0, null, null, "Sony" },
                    { new Guid("f27effce-038f-4253-a632-14aa0acc89ca"), new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), null, (byte)0, null, null, "JBL" },
                    { new Guid("f8c6cc19-38e0-4867-8216-43092f01af05"), new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), null, (byte)0, null, null, "Logitech" }
                });

            migrationBuilder.InsertData(
                table: "EVoucher",
                columns: new[] { "VoucherId", "Code", "CreatedAt", "CreatedBy", "DelFlg", "Description", "LastModified", "LastModifiedBy", "Percent", "VouncherName" },
                values: new object[,]
                {
                    { new Guid("a723d28b-24d6-4c58-9e3a-0bdcb93580d2"), "EVOUNCHERKM20%", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), null, (byte)0, "Discount 20% for speaker", null, null, 0.20000000000000001, "KM20%" },
                    { new Guid("bf712960-13f1-4be0-a34b-8f53a1095faf"), "EVOUNCHERKM25%", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), null, (byte)0, "Discount 25% for speaker", null, null, 0.25, "KM25%" },
                    { new Guid("da20e3e7-a8f6-4ace-abee-3f03436d33d2"), "EVOUNCHERKM10%", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), null, (byte)0, "Discount 10% for speaker", null, null, 0.10000000000000001, "KM10%" },
                    { new Guid("e09f2a37-f53e-4aad-8dba-35be56184c50"), "EVOUNCHERKM5%", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), null, (byte)0, "Discount 5% for speaker", null, null, 0.5, "KM5%" },
                    { new Guid("e9cf62f1-bdde-48c3-a3a0-58bc7696ad7a"), "EVOUNCHERKM15%", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), null, (byte)0, "Discount 15% for speaker", null, null, 0.14999999999999999, "KM15%" }
                });

            migrationBuilder.InsertData(
                table: "Speaker",
                columns: new[] { "Id", "BrandId", "CreatedAt", "CreatedBy", "Decription", "DelFlg", "Img", "LastModified", "LastModifiedBy", "Name", "Price", "UnitInStock" },
                values: new object[] { new Guid("8abe03f8-bfc0-42b0-8a69-850826a14db4"), new Guid("f8c6cc19-38e0-4867-8216-43092f01af05"), new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), null, "Portable Bluetooth speaker with light show", (byte)0, "https://cdn.tgdd.vn/Products/Images/2162/249767/sony-srs-xb13-150323-031134-600x600.jpg", null, null, "Sony SRS-XB13", 950000.0, 10 });

            migrationBuilder.CreateIndex(
                name: "IX_OrderDetail_SpeakerId",
                table: "OrderDetail",
                column: "SpeakerId");

            migrationBuilder.CreateIndex(
                name: "IX_Speaker_BrandId",
                table: "Speaker",
                column: "BrandId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Cart");

            migrationBuilder.DropTable(
                name: "EVoucher");

            migrationBuilder.DropTable(
                name: "OrderDetail");

            migrationBuilder.DropTable(
                name: "Payment");

            migrationBuilder.DropTable(
                name: "Order");

            migrationBuilder.DropTable(
                name: "Speaker");

            migrationBuilder.DropTable(
                name: "Brand");
        }
    }
}
