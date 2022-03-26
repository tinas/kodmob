import React from 'react'
import { Image } from 'react-native'
import { SvgXml } from 'react-native-svg'
import { getSvgLogo } from '../services/companyLogoService'
import { EMPTY_COMPANY_LOGO } from '../helpers/constants'

const CompanyLogo = ({ uri, width, height, ...props }) => {
  const [svg, setSvg] = React.useState()
  const [image, setImage] = React.useState(EMPTY_COMPANY_LOGO)

  React.useEffect(() => {
    loadLogo()
  }, [uri])

  const loadLogo = async () => {
    if (uri.includes('.svg')) {
      try {
        const response = await getSvgLogo(uri)

        setSvg(response.data)
      } catch (e) {
        setSvg(null)
      }
    } else {
      setImage(uri)
    }
  }

  const handleImageError = () => {
    setImage(EMPTY_COMPANY_LOGO)
  }

  return (
    uri.includes('.svg') && svg
      ? <SvgXml width={width} height={height} xml={svg} {...props} />
      : <Image
        style={{ borderRadius: 4 }}
        width={width}
        height={height}
        resizeMode="contain"
        source={{ uri: image }}
        onError={handleImageError}
        {...props}
      />
  )
}

export default CompanyLogo