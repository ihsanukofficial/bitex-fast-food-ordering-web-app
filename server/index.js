/**
 * Static asset worker with a single-page-application fallback for client routes.
 */
export default {
  /**
   * Serves a matching static asset or returns the application shell for unknown paths.
   */
  async fetch(request, environment) {
    const response = await environment.ASSETS.fetch(request)

    if (response.status !== 404) {
      return response
    }

    const url = new URL(request.url)
    // Client-side routes need the same document shell as the root path.
    url.pathname = '/index.html'

    return environment.ASSETS.fetch(new Request(url, request))
  },
}
