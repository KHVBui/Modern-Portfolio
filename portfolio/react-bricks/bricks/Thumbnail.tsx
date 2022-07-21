// Thumbnail.tsx
import React from 'react'
import { types, Text, RichText, Image } from 'react-bricks/frontend'

interface ThumbnailProps {
  hasShadow: boolean
  bgColor: types.IColor
}

const Thumbnail: types.Brick<ThumbnailProps> = ({
   hasShadow, bgColor, ...rest
  }) => {
  return (
    <div
      {...rest}
      className={`my-6 p-6 text-center border rounded-lg ${
        hasShadow ? 'shadow-xl' : ''
      } ${bgColor?.className}`}
    >
      <Image
        propName="image"
        alt="Fallback alt tag"
        maxWidth={200}
        imageClassName="mb-6"   
      />
      <RichText
        propName="title"
        renderBlock={({ children }) => (
          <h1 className="text-2xl font-bold">{children}</h1>
        )}
        placeholder="Type a title..."
        allowedFeatures={[
          types.RichTextFeatures.Bold,
          types.RichTextFeatures.Italic,
          types.RichTextFeatures.Code,
          types.RichTextFeatures.Link,
        ]}
        renderHighlight={({ children }) => (
          <span className="px-1 rounded bg-blue-200 text-blue-900" >
            {children}
          </span>
        )}
      />
      <RichText
        propName="description"
        renderBlock={({ children }) => (
          <p className="text-lg text-gray-500">{children}</p>
        )}
        placeholder="Type a description"
        allowedFeatures={[
          types.RichTextFeatures.Bold,
          types.RichTextFeatures.Italic,
          types.RichTextFeatures.Code,
          types.RichTextFeatures.Link,
        ]}
        renderHighlight={({ children }) => (
          <span className="px-1 rounded bg-blue-200 text-blue-900">
            {children}
          </span>
        )}
      />
    </div>
  )
}

Thumbnail.schema = {
  name: 'thumbnail',
  label: 'Thumbnail',
  hideFromAddMenu: true,
  getDefaultProps: () => ({
    title: 'Hello, world!',
    description: 'Lorem ipsum dolor sit amet.',
    image: {
      src: "https://images.reactbricks.com/original/3c4b1f31-16ec-417f-ab2d-d734632bdeb8.svg",
      placeholderSrc: "https://images.reactbricks.com/original/3c4b1f31-16ec-417f-ab2d-d734632bdeb8.svg",
      srcSet: "",
      alt: "React Bricks Icon",
      seoName: "react-bricks-icon"
    },
    hasShadow: true,
    bgColor: { color: '#ffffff', className: 'bg-white' },
  }),
  sideEditProps: [
    {
      groupName: 'Container',
      defaultOpen: true,
      props: [
        {
          name: 'hasShadow',
          label: 'Shadow',
          type: types.SideEditPropType.Boolean,
        },
        {
          name: 'bgColor',
          label: 'Background',
          type: types.SideEditPropType.Select,
          selectOptions: {
            display: types.OptionsDisplay.Color,
            options: [
              {
                label: 'White',
                value: { color: '#ffffff', className: 'bg-white' },
              },
              {
                label: 'Light blue',
                value: { color: '#eff6ff', className: 'bg-blue-50' },
              },
            ],
          },
        },
      ],
    },
  ],
}

export default Thumbnail