import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Aquí definimos qué rutas son "privadas" (donde se gasta dinero)
const isProtectedRoute = createRouteMatcher([
  '/api/generate(.*)',    // Generar cuento
  '/api/tts(.*)',         // Generar audio
  '/api/magic-image(.*)', // Generar imagen
  '/api/proxy-image(.*)'  // Descargar imagen
]);

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) await auth.protect();
});

export const config = {
  matcher: [
    // Excluir archivos estáticos y de Next.js
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Siempre ejecutar para rutas de API
    '/(api|trpc)(.*)',
  ],
};