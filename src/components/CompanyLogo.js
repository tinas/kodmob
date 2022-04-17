import React from 'react'
import { Image } from 'react-native'
import { SvgXml } from 'react-native-svg'
import { getSvgLogo } from '../services/companyLogoService'
import { EMPTY_COMPANY_LOGO } from '../helpers/constants'

const CompanyLogo = ({ uri, width, height, ...props }) => {
  const [svg, setSvg] = React.useState()
  const [image, setImage] = React.useState()

  React.useEffect(() => {
    let isMounted = true

    if (uri.includes('.svg')) {
      getSvgLogo(uri).then(response => {
        if (isMounted) setSvg(response.data)
      }).catch((e) => {
        console.log(e)
        if (isMounted) setSvg(null)
      })
    } else {
      setImage(uri)
    }

    return () => { isMounted = false }
  }, [uri])

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