using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class InitDatabase : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_OrderDetail_Order_OrderId",
                table: "OrderDetail");

            migrationBuilder.DropForeignKey(
                name: "FK_OrderDetail_Speaker_SpeakerId",
                table: "OrderDetail");

            migrationBuilder.DropForeignKey(
                name: "FK_Speaker_Brand_BrandId",
                table: "Speaker");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Speaker",
                table: "Speaker");

            migrationBuilder.DropPrimaryKey(
                name: "PK_OrderDetail",
                table: "OrderDetail");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Order",
                table: "Order");

            migrationBuilder.DropPrimaryKey(
                name: "PK_EVoucher",
                table: "EVoucher");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Cart",
                table: "Cart");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Brand",
                table: "Brand");

            migrationBuilder.RenameTable(
                name: "Speaker",
                newName: "Speakers");

            migrationBuilder.RenameTable(
                name: "OrderDetail",
                newName: "OrderDetails");

            migrationBuilder.RenameTable(
                name: "Order",
                newName: "Orders");

            migrationBuilder.RenameTable(
                name: "EVoucher",
                newName: "EVouchers");

            migrationBuilder.RenameTable(
                name: "Cart",
                newName: "Carts");

            migrationBuilder.RenameTable(
                name: "Brand",
                newName: "Brands");

            migrationBuilder.RenameIndex(
                name: "IX_Speaker_BrandId",
                table: "Speakers",
                newName: "IX_Speakers_BrandId");

            migrationBuilder.RenameIndex(
                name: "IX_OrderDetail_SpeakerId",
                table: "OrderDetails",
                newName: "IX_OrderDetails_SpeakerId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Speakers",
                table: "Speakers",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_OrderDetails",
                table: "OrderDetails",
                columns: new[] { "OrderId", "SpeakerId" });

            migrationBuilder.AddPrimaryKey(
                name: "PK_Orders",
                table: "Orders",
                column: "OrderId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_EVouchers",
                table: "EVouchers",
                column: "VoucherId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Carts",
                table: "Carts",
                columns: new[] { "UserId", "SpeakerId" });

            migrationBuilder.AddPrimaryKey(
                name: "PK_Brands",
                table: "Brands",
                column: "BrandId");

            migrationBuilder.AddForeignKey(
                name: "FK_OrderDetails_Orders_OrderId",
                table: "OrderDetails",
                column: "OrderId",
                principalTable: "Orders",
                principalColumn: "OrderId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_OrderDetails_Speakers_SpeakerId",
                table: "OrderDetails",
                column: "SpeakerId",
                principalTable: "Speakers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Speakers_Brands_BrandId",
                table: "Speakers",
                column: "BrandId",
                principalTable: "Brands",
                principalColumn: "BrandId",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_OrderDetails_Orders_OrderId",
                table: "OrderDetails");

            migrationBuilder.DropForeignKey(
                name: "FK_OrderDetails_Speakers_SpeakerId",
                table: "OrderDetails");

            migrationBuilder.DropForeignKey(
                name: "FK_Speakers_Brands_BrandId",
                table: "Speakers");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Speakers",
                table: "Speakers");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Orders",
                table: "Orders");

            migrationBuilder.DropPrimaryKey(
                name: "PK_OrderDetails",
                table: "OrderDetails");

            migrationBuilder.DropPrimaryKey(
                name: "PK_EVouchers",
                table: "EVouchers");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Carts",
                table: "Carts");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Brands",
                table: "Brands");

            migrationBuilder.RenameTable(
                name: "Speakers",
                newName: "Speaker");

            migrationBuilder.RenameTable(
                name: "Orders",
                newName: "Order");

            migrationBuilder.RenameTable(
                name: "OrderDetails",
                newName: "OrderDetail");

            migrationBuilder.RenameTable(
                name: "EVouchers",
                newName: "EVoucher");

            migrationBuilder.RenameTable(
                name: "Carts",
                newName: "Cart");

            migrationBuilder.RenameTable(
                name: "Brands",
                newName: "Brand");

            migrationBuilder.RenameIndex(
                name: "IX_Speakers_BrandId",
                table: "Speaker",
                newName: "IX_Speaker_BrandId");

            migrationBuilder.RenameIndex(
                name: "IX_OrderDetails_SpeakerId",
                table: "OrderDetail",
                newName: "IX_OrderDetail_SpeakerId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Speaker",
                table: "Speaker",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Order",
                table: "Order",
                column: "OrderId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_OrderDetail",
                table: "OrderDetail",
                columns: new[] { "OrderId", "SpeakerId" });

            migrationBuilder.AddPrimaryKey(
                name: "PK_EVoucher",
                table: "EVoucher",
                column: "VoucherId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Cart",
                table: "Cart",
                columns: new[] { "UserId", "SpeakerId" });

            migrationBuilder.AddPrimaryKey(
                name: "PK_Brand",
                table: "Brand",
                column: "BrandId");

            migrationBuilder.AddForeignKey(
                name: "FK_OrderDetail_Order_OrderId",
                table: "OrderDetail",
                column: "OrderId",
                principalTable: "Order",
                principalColumn: "OrderId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_OrderDetail_Speaker_SpeakerId",
                table: "OrderDetail",
                column: "SpeakerId",
                principalTable: "Speaker",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Speaker_Brand_BrandId",
                table: "Speaker",
                column: "BrandId",
                principalTable: "Brand",
                principalColumn: "BrandId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
