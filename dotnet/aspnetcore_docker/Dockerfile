FROM mcr.microsoft.com/dotnet/core/aspnet:3.1-buster-slim AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/core/sdk:3.1-buster AS build
WORKDIR /src
COPY ["aspnetcore_docker/aspnetcore_docker.csproj", "aspnetcore_docker/"]
RUN dotnet restore "aspnetcore_docker/aspnetcore_docker.csproj"
COPY . .
WORKDIR "/src/aspnetcore_docker"
RUN dotnet build "aspnetcore_docker.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "aspnetcore_docker.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "aspnetcore_docker.dll"]