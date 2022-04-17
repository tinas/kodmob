import React from 'react'
import { SafeAreaView, FlatList } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Box from '../components/Box'
import Label from '../components/Label'
import Input from '../components/Input'
import Button from '../components/Button'
import JobCard from '../components/JobCard'
import Loader from '../components/Loader'
import theme from '../helpers/theme'
import { ArrowLeft, X } from '../components/icons'
import { search } from '../services/jobs-service'
import { getStoreData, setStoreData } from '../helpers/asyncStorage'
import { formatDateOfData } from '../helpers/date'
import { HISTORY_STORAGE_KEY } from '../helpers/constants'

const SearchResultsView = ({ route }) => {
  const [result, setResult] = React.useState([])
  const [historyList, setHistoryList] = React.useState([])
  const [value, setValue] = React.useState('')
  const [lastSearchValue, setLastSearchValue] = React.useState('')
  const [isLoading, setLoading] = React.useState(false)

  const navigation = useNavigation()
  const inputRef = React.createRef()
  const tag = route.params.tag

  React.useEffect(() => {
    load()

    if (!tag) onFocus()
  }, [])

  const load = async () => {
    if (tag) return await getSearchResult()

    const storedArray = await getStoreData(HISTORY_STORAGE_KEY)
    setHistoryList(storedArray)
  }

  const onFocus = () => {
    inputRef.current.focus()
  }

  const onClear = () => {
    setValue('')
  }

  const setStore = async () => {
    const storedArray = await getStoreData(HISTORY_STORAGE_KEY)

    if (storedArray.includes(value)) return

    storedArray.unshift(value)
    await setStoreData(HISTORY_STORAGE_KEY, storedArray)
  }

  const getSearchResult = async () => {
    if (tag && !lastSearchValue) setValue(tag)
    else if (!value || value == lastSearchValue) return

    setLoading(true)

    const searchValue = tag || value
    const response = await search(searchValue)
    const prepareData = formatDateOfData(response.data.data)

    setResult(prepareData)
    setLastSearchValue(searchValue)

    await setStore()

    setLoading(false)
  }

  const clearSearchHistory = async () => {
    await setStoreData(HISTORY_STORAGE_KEY, [])

    setHistoryList([])
  }

  const renderItem = ({ item }) => (
    <JobCard key={item.slug} item={item} />
  )

  const keyExtractor = (item) => item.slug

  return (
    <Box as={SafeAreaView} flex={1} backgroundColor={theme.colors.white}>
      <Box position="relative" mb={8}>
        <Input
          ref={inputRef}
          height={52}
          px={52}
          color="primaryText"
          backgroundColor="searchBox"
          placeholder='Pozisyon adı, teknoloji adı'
          value={value}
          onChangeText={(text) => setValue(text)}
          returnKeyType="search"
          autoCapitalize='none'
          onEndEditing={getSearchResult}
        />
        <Box position="absolute" left={14} top={14}>
          <Button onPress={() => navigation.goBack()}>
            <ArrowLeft width={24} height={24} color={theme.colors.icon} />
          </Button>
        </Box>
        {value.length > 0 && (
          <Box position="absolute" right={14} top={14}>
            <Button onPress={onClear} hitSlop={{ top: 16, right: 8, bottom: 8, left: 16 }}>
              <X width={24} height={24} color={theme.colors.icon} />
            </Button>
          </Box>
        )}
      </Box>
      {
        isLoading
          ? <Loader flex={1} />
          : result.length > 0
            ? <FlatList
              style={{ backgroundColor: "white" }}
              contentContainerStyle={{ paddingHorizontal: 16 }}
              ListHeaderComponent={() => (
                <Box flexDirection="row" mt={16} mb={8}>
                  <Label fontWeight={600} color="placeholder">{lastSearchValue}</Label>
                  <Label ml={4} color="placeholder">için sonuçlar</Label>
                </Box>
              )}
              showsVerticalScrollIndicator={false}
              data={result}
              keyExtractor={keyExtractor}
              renderItem={renderItem}
              removeClippedSubviews={true}
            />
            : <FlatList
              ListHeaderComponent={() => (
                <Box
                  flexDirection="row"
                  justifyContent="space-between"
                  alignItems="baseline"
                  mb={16}
                  mt={40}
                >
                  <Label fontSize={20} fontWeight="600" color="icon">Son aramalarınız</Label>
                  <Button
                    hitSlop={{ top: 16, right: 16, left: 16, bottom: 16 }}
                    onPress={clearSearchHistory}
                    disabled={!historyList.length}
                  >
                    <Label fontSize={12} fontWeight={600} color={!historyList.length ? 'placeholder' : 'green'}>Geçmişi temizle</Label>
                  </Button>
                </Box>
              )}
              ListEmptyComponent={() => (
                <Label
                  fontSize={12}
                  fontWeight={600}
                  color="placeholder"
                >
                  Yaptığınız aramalar burada listelenir.
                </Label>
              )}
              style={{ backgroundColor: "white" }}
              contentContainerStyle={{ paddingHorizontal: 16 }}
              showsVerticalScrollIndicator={false}
              data={historyList}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <Button
                  border={1}
                  borderRadius={6}
                  borderColor="border"
                  mb={8}
                  p={12}
                  onPressIn={() => setValue(item)}
                  onPressOut={getSearchResult}
                >
                  <Label fontSize={12} fontWeight={600} color="placeholder">{item}</Label>
                </Button>
              )}
            />
      }
    </Box>
  )
}

export default SearchResultsView