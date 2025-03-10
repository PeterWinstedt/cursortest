# Docker CI/CD Pipeline

This directory contains GitHub Actions workflows for building and publishing Docker containers for the TodoApp application.

## Workflow: Build and Publish Docker Image

The `docker-build.yml` workflow builds a Docker container for the TodoApp and publishes it to GitHub Container Registry (ghcr.io).

### Triggers

The workflow is triggered on:
- Push to the `main` branch
- Pull requests to the `main` branch
- Manual triggering via GitHub Actions UI (workflow_dispatch)

### What it does

1. Checks out the repository
2. Sets up Docker Buildx for efficient builds
3. Logs in to GitHub Container Registry
4. Extracts metadata for Docker image
5. Builds and pushes the Docker image with appropriate tags:
   - `latest` for builds from the main branch
   - Short SHA hash of the commit for all builds

### Required Secrets

- `GITHUB_TOKEN` (automatically provided by GitHub)

## Environment Configurations

The workflow is designed to work with three separate environments as specified in the project requirements:
- Development
- Test
- Production

## Usage

To run this workflow manually:
1. Go to the Actions tab in your GitHub repository
2. Select "Build and Publish Docker Image" workflow
3. Click "Run workflow"
4. Select the branch you want to build from
5. Click "Run workflow" 