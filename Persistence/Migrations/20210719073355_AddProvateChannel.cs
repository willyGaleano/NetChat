using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class AddProvateChannel : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Channels",
                keyColumn: "Id",
                keyValue: new Guid("5e5bb876-7109-46c2-9129-0366168f1254"));

            migrationBuilder.DeleteData(
                table: "Channels",
                keyColumn: "Id",
                keyValue: new Guid("e3415eb0-69f4-405e-8abd-441dd8e9e2ad"));

            migrationBuilder.DeleteData(
                table: "Channels",
                keyColumn: "Id",
                keyValue: new Guid("f9f7e384-a8f8-4d9a-b570-8704b9cb8e88"));

            migrationBuilder.AddColumn<string>(
                name: "PrivateChannelId",
                table: "Channels",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsOnline",
                table: "AspNetUsers",
                nullable: false,
                defaultValue: false);

            migrationBuilder.InsertData(
                table: "Channels",
                columns: new[] { "Id", "ChannelType", "Description", "Name", "PrivateChannelId" },
                values: new object[] { new Guid("c2055ff5-4aae-48e8-baa4-dcf22b1d57d1"), 0, "Canal dedicado a dotnet core", "DotNetCore", null });

            migrationBuilder.InsertData(
                table: "Channels",
                columns: new[] { "Id", "ChannelType", "Description", "Name", "PrivateChannelId" },
                values: new object[] { new Guid("020006e5-693d-40b0-801d-ae3766f3f4a0"), 0, "Canal dedicado a dotnet react js", "React JS", null });

            migrationBuilder.InsertData(
                table: "Channels",
                columns: new[] { "Id", "ChannelType", "Description", "Name", "PrivateChannelId" },
                values: new object[] { new Guid("b6da5869-a05b-46d3-8637-ed546fc3de4e"), 0, "Canal dedicado a dotnet angular", "Angular", null });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Channels",
                keyColumn: "Id",
                keyValue: new Guid("020006e5-693d-40b0-801d-ae3766f3f4a0"));

            migrationBuilder.DeleteData(
                table: "Channels",
                keyColumn: "Id",
                keyValue: new Guid("b6da5869-a05b-46d3-8637-ed546fc3de4e"));

            migrationBuilder.DeleteData(
                table: "Channels",
                keyColumn: "Id",
                keyValue: new Guid("c2055ff5-4aae-48e8-baa4-dcf22b1d57d1"));

            migrationBuilder.DropColumn(
                name: "PrivateChannelId",
                table: "Channels");

            migrationBuilder.DropColumn(
                name: "IsOnline",
                table: "AspNetUsers");

            migrationBuilder.InsertData(
                table: "Channels",
                columns: new[] { "Id", "ChannelType", "Description", "Name" },
                values: new object[] { new Guid("5e5bb876-7109-46c2-9129-0366168f1254"), 0, "Canal dedicado a dotnet core", "DotNetCore" });

            migrationBuilder.InsertData(
                table: "Channels",
                columns: new[] { "Id", "ChannelType", "Description", "Name" },
                values: new object[] { new Guid("f9f7e384-a8f8-4d9a-b570-8704b9cb8e88"), 0, "Canal dedicado a dotnet react js", "React JS" });

            migrationBuilder.InsertData(
                table: "Channels",
                columns: new[] { "Id", "ChannelType", "Description", "Name" },
                values: new object[] { new Guid("e3415eb0-69f4-405e-8abd-441dd8e9e2ad"), 0, "Canal dedicado a dotnet angular", "Angular" });
        }
    }
}
