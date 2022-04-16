import React from 'react'
import { SafeAreaView, FlatList } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Box from '../components/Box'
import Label from '../components/Label'
import Input from '../components/Input'
import Button from '../components/Button'
import JobCard from '../components/JobCard'
import theme from '../helpers/theme'
import { ArrowLeft, X } from '../components/icons'
import { search } from '../services/jobs-service'
import { getStoreData, setStoreData } from '../helpers/asyncStorage'
import { HISTORY_STORAGE_KEY } from '../helpers/constants'

const SearchResultsView = ({ route }) => {
  const [result, setResult] = React.useState([])
  const [historyList, setHistoryList] = React.useState([])
  const [value, setValue] = React.useState('')
  const [lastSearchValue, setLastSearchValue] = React.useState('')

  const navigation = useNavigation()
  const inputRef = React.createRef()
  const tag = route.params.tag

  React.useEffect(() => {
    (async () => {
      const storedArray = await getStoreData(HISTORY_STORAGE_KEY)
      setHistoryList(storedArray)

      if (!tag) return

      setValue(tag)
      await getSearchResult()
    })()

    onFocus()
  }, [])

  const onFocus = () => {
    if (tag) return

    inputRef.current.focus()
  }

  const onClear = () => {
    setValue('')
    onFocus()
  }

  const setStore = async () => {
    const storedArray = await getStoreData(HISTORY_STORAGE_KEY)

    if (storedArray.includes(value)) return

    storedArray.push(value)
    await setStoreData(HISTORY_STORAGE_KEY, storedArray)
  }

  const getSearchResult = async () => {
    if (!value || value == lastSearchValue) return

    const response = await search(value)

    setResult(response.data.data)
    setLastSearchValue(value)

    await setStore()
  }

  const onHistoryValuePressed = async (value) => {
    setValue(value)

    await getSearchResult()
  }

  const clearSearchHistory = async () => {
    await setStoreData(HISTORY_STORAGE_KEY, [])

    setHistoryList([])
  }

  return (
    <Box as={SafeAreaView} flex={1} backgroundColor={theme.colors.white}>
      <Box position="relative">
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
        result.length > 0
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
            keyExtractor={(item) => item.slug}
            renderItem={({ item }) => <JobCard item={item} />}
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
                Geçmişte yaptığınız aramalar burada listelenir.
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
                onPress={() => onHistoryValuePressed(item)}
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