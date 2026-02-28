using MovieFinderAPI.Model;
using MovieFinderAPI.Models;

namespace MovieFinderAPI.ModelConversion
{
    public static class SwipeConversion
    {
       
        public static UserSwipe ToEntity(UserSwipeDto dto)
        {
            if (dto is null)
            {
                throw new ArgumentNullException(nameof(dto));
            }

            return new UserSwipe
            {
                // Id intentionally left as default (0) because DTO does not carry it.
                UserId = dto.UserId,
                TmdbId = dto.TmdbId,
                IsLike = dto.IsLike,
                HasWatched = dto.HasWatched,
                Timestamp = dto.Timestamp,
                OriginalTitle = dto.OriginalTitle,
                PosterPath = dto.PosterPath


            };
        }

       
        public static UserSwipeDto ToDto(UserSwipe entity)
        {
            if (entity is null)
            {
                throw new ArgumentNullException(nameof(entity));
            }

            return new UserSwipeDto
            {
                UserId = entity.UserId,
                TmdbId = entity.TmdbId,
                IsLike = entity.IsLike,
                HasWatched = entity.HasWatched,
                Timestamp = entity.Timestamp,
                OriginalTitle = entity.OriginalTitle,
                PosterPath = entity.PosterPath
            };
        }
    }
}
