using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MovieFinderAPI.Migrations
{
    /// <inheritdoc />
    public partial class AddHasWatchedColumn : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<bool>(
                name: "IsLike",
                table: "UserSwipes",
                type: "bit",
                nullable: true,
                oldClrType: typeof(bool),
                oldType: "bit");

            migrationBuilder.AddColumn<bool>(
                name: "HasWatched",
                table: "UserSwipes",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "HasWatched",
                table: "UserSwipes");

            migrationBuilder.AlterColumn<bool>(
                name: "IsLike",
                table: "UserSwipes",
                type: "bit",
                nullable: false,
                defaultValue: false,
                oldClrType: typeof(bool),
                oldType: "bit",
                oldNullable: true);
        }
    }
}
