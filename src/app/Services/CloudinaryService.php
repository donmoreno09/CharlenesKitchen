<?php

namespace App\Services;

use CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary;
use Illuminate\Http\UploadedFile;

class CloudinaryService
{
    // The folder name inside your Cloudinary account where images will be stored.
    // Keeping them in a named folder makes the account organized.
    private string $folder = 'charlenes-kitchen';

    // ── Upload ─────────────────────────────────────────────────────────────────

    // Accepts a Laravel UploadedFile (from $request->file('image'))
    // Returns an array with the URL and public_id we need to store.
    // ?string means $folder accepts a string OR null — explicitly nullable.
    // Without the ?, PHP flags it as an implicit nullable deprecation warning.
    public function uploadImage(UploadedFile $file, ?string $folder = null): array
    {
        $uploadFolder = $folder ?? $this->folder;

        // The Cloudinary facade handles the actual HTTP upload to Cloudinary's API.
        // getRealPath() gives the temporary file path on the server.
        $result = Cloudinary::upload($file->getRealPath(), [
            'folder'         => $uploadFolder,
            // Auto-detect best format (WebP for browsers that support it, etc.)
            'fetch_format'   => 'auto',
            // Auto-select best quality/filesize balance
            'quality'        => 'auto',
        ]);

        return [
            // The full CDN URL — use this as the src in <img> tags
            'url'       => $result->getSecurePath(),
            // Cloudinary's internal identifier — needed for deletion/transformation
            'public_id' => $result->getPublicId(),
        ];
    }

    // ── Delete ─────────────────────────────────────────────────────────────────

    // Removes an image from Cloudinary using its public_id.
    // Called when a menu item is deleted or its image is replaced.
    public function deleteImage(string $publicId): void
    {
        Cloudinary::destroy($publicId);
    }

    // ── Transform URL ──────────────────────────────────────────────────────────

    // Cloudinary's most powerful feature: real-time image transformation via URL.
    // Instead of pre-generating thumbnails, we modify the URL to request any size.
    //
    // Example: a 4MB original becomes a 20KB thumbnail by changing the URL.
    // This is handled entirely by Cloudinary's CDN — no server processing needed.
    public function getThumbnailUrl(string $publicId, int $width = 400, int $height = 300): string
    {
        return cloudinary()->image($publicId)->resize(
            \Cloudinary\Transformation\Resize::fill($width, $height)
        )->toUrl();
    }
}