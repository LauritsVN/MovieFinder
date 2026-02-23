using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MovieFinderAPI.Migrations
{
    /// <inheritdoc />
    public partial class AddTitleAndPosterToSwipes : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "OriginalTitle",
                table: "UserSwipes",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "PosterPath",
                table: "UserSwipes",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "GenreIds",
                table: "Movies",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "[]");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "OriginalTitle",
                table: "UserSwipes");

            migrationBuilder.DropColumn(
                name: "PosterPath",
                table: "UserSwipes");

            migrationBuilder.DropColumn(
                name: "GenreIds",
                table: "Movies");
        }
    }
}
