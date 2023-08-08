/* eslint-env jest */
import { v2 as cloudinary } from 'cloudinary'
import { fileUpload } from '../../src/helpers/fileUpload'

cloudinary.config({
  cloud_name: 'dtdwo7jl1',
  api_key: '921749789664332',
  api_secret: 'HrrTgkSPOH-In45i4JqCA3cZ8pU',
  secure: true
})

describe('Pruebas en el file upload', () => {
  test('Debe subir el archivo correctamente a cloudinary', async () => {
    const imageUrl = 'https://cdn.pixabay.com/photo/2012/08/27/14/19/mountains-55067_640.png'
    const resp = await fetch(imageUrl)
    const blob = await resp.blob()
    const file = new File([blob], 'test-image.png')
    const url = await fileUpload(file)
    expect(typeof url).toBe('string')
    /* Delte the image from the storage after adding it for testing purposes */
    const segments = url.split('/')
    const imageId = segments[segments.length - 1].split('.')[0]
    await cloudinary.api.delete_resources([`journal/${imageId}`], {
      resource_type: 'image'
    })
  })

  test('Debe retornar null', async () => {
    const file = new File([], 'test-image.png')
    const url = await fileUpload(file)
    expect(url).toBeNull()
  })
})
