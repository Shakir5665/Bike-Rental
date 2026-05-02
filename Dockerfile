# Use the official .NET SDK image to build the app
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

# Copy the solution and project files
COPY ["BikeRentalSystem.sln", "./"]
COPY ["Backend/BikeRental.Api/BikeRental.Api.csproj", "Backend/BikeRental.Api/"]

# Restore dependencies
RUN dotnet restore "Backend/BikeRental.Api/BikeRental.Api.csproj"

# Copy the rest of the source code
COPY . .

# Build and publish the app
WORKDIR "/app/Backend/BikeRental.Api"
RUN dotnet publish "BikeRental.Api.csproj" -c Release -o /app/publish /p:UseAppHost=false

# Use the official .NET runtime image to run the app
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app
EXPOSE 8080
ENV ASPNETCORE_URLS=http://+:8080

# Copy the published output from the build stage
COPY --from=build /app/publish .

# Start the application
ENTRYPOINT ["dotnet", "BikeRental.Api.dll"]
