export const resizeImage = (
  file: File,
  opts: {
    width: number
    height: number
    quality: number
    blur: boolean
  } = {
    width: 1200, // Desired output width
    height: 630, // Desired output height
    quality: 1.0, // Set quality to maximum
    blur: false // Set blur to false
  }
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (e: ProgressEvent<FileReader>) => {
      const img = new Image()
      img.src = e.target?.result as string
      img.onload = () => {
        const targetWidth = opts.width
        const targetHeight = opts.height
        const canvas = document.createElement('canvas')
        canvas.width = targetWidth
        canvas.height = targetHeight

        const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
        ctx.imageSmoothingQuality = 'high' // Set image smoothing quality to high

        // Calculating the aspect ratio
        const sourceWidth = img.width
        const sourceHeight = img.height
        const sourceAspectRatio = sourceWidth / sourceHeight
        const targetAspectRatio = targetWidth / targetHeight

        let drawWidth: number
        let drawHeight: number
        let offsetX = 0
        let offsetY = 0

        // Adjust drawing sizes based on the aspect ratio
        if (sourceAspectRatio > targetAspectRatio) {
          // Source is wider
          drawHeight = sourceHeight
          drawWidth = sourceHeight * targetAspectRatio
          offsetX = (sourceWidth - drawWidth) / 2
        } else {
          // Source is taller or has the same aspect ratio
          drawWidth = sourceWidth
          drawHeight = sourceWidth / targetAspectRatio
          offsetY = (sourceHeight - drawHeight) / 2
        }

        // Draw the image onto the canvas
        ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight, 0, 0, targetWidth, targetHeight)

        // Convert the canvas to a base64 string
        const base64Image = canvas.toDataURL('image/jpeg', opts.quality)
        resolve(base64Image)
      }
      img.onerror = (error) => reject(new Error('Image loading error: ' + error))
    }
    reader.onerror = (error) => reject(new Error('FileReader error: ' + error))
    reader.readAsDataURL(file)
  })
}

// Pixel GIF code adapted from https://stackoverflow.com/a/33919020/266535
const keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='

const triplet = (e1: number, e2: number, e3: number) =>
  keyStr.charAt(e1 >> 2) +
  keyStr.charAt(((e1 & 3) << 4) | (e2 >> 4)) +
  keyStr.charAt(((e2 & 15) << 2) | (e3 >> 6)) +
  keyStr.charAt(e3 & 63)

export const rgbDataURL = (r: number, g: number, b: number) =>
  `data:image/gif;base64,R0lGODlhAQABAPAA${triplet(0, r, g) + triplet(b, 255, 255)}/yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==`

export type ImageLayout = 'portrait' | 'landscape' | 'square'

export const getBase64Blur = (layout?: ImageLayout) => {
  switch (layout) {
    case 'landscape':
      return `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAADCAIAAAA7ljmRAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAMElEQVR4nGPQUJYVZGBwsjDxc7JiWDCpU0GU6//H97PaahlWzpoYbKV1YsPSxrwkAN9RDmHBRT+gAAAAAElFTkSuQmCC`
    case 'square':
      return `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAADCAIAAAA7ljmRAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAMElEQVR4nGOY0tl6/crlH3//Ty4vYPBzNK/MjOns6bHRVGbQU5fX11LS19FkZ2YAAHRODjkuKvFKAAAAAElFTkSuQmCC`
    default:
      return `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAECAIAAADETxJQAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAMUlEQVR4nGOw9/Ewc3Owi9Fl8HG0YWBlcHHWZyhJiqwsSJtSkcZw+9zR/78/rFrYDwDY5w79SD3YEwAAAABJRU5ErkJggg==`
    // return rgbDataURL(238, 200, 203)
  }
}

interface BlurImageOptions {
  layout?: ImageLayout
  quality?: number
  blur?: number
  width?: number
  height?: number
}
export const blurImage = (
  url?: string | null,
  opts: BlurImageOptions | undefined = {
    layout: 'portrait',
    quality: 25,
    blur: 100
  }
): Promise<string> => {
  return new Promise(async (resolve) => {
    if (!url) return resolve(rgbDataURL(252, 244, 236))
    try {
      const imgW = opts.width ? opts.width : opts.layout === 'portrait' ? 320 : opts.layout === 'square' ? 320 : 480
      const imgH = opts.height ? opts.height : opts.layout === 'portrait' ? 480 : opts.layout === 'square' ? 320 : 240
      const blurUrl = new URL(url)
      const imgParams = new URLSearchParams({
        auto: 'compress',
        // fm: 'blurhash',
        fm: 'jpg',
        blur: opts.blur?.toString() || '100',
        w: (imgW / 4).toString(),
        h: (imgH / 4).toString(),
        q: opts.quality?.toString() || '25',
        dpr: '1'
      })
      blurUrl.search = imgParams.toString()
      // const blurUrl = `${url}?auto=compress&fm=blurhash&w=${imgW / 10}&h=${imgH / 10}&q=${opts?.quality || 25}&dpr=1`
      // const blurUrl = `${url}?w=${imgW / 4}&h=${imgH / 4}&q=${opts.quality}&blur=${opts.blur}&dpr=1`
      const res = await fetch(blurUrl.href)
      // const hash = await res.text()
      // return resolve(hash)
      // const base64Img = blurHashToDataURL(hash, imgW / 10, imgH / 10)

      const buffer = Buffer.from(await res.arrayBuffer())
      const base64Img = `data:image/jpeg;base64,${buffer.toString('base64')}`
      return resolve(base64Img)
    } catch (error) {
      console.error('Error loading image:', error)
      return resolve(rgbDataURL(252, 244, 236))
    }
  })
}

// export const getImageWidth = ()
