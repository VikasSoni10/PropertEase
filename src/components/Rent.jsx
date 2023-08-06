import {
  HStack,
  Heading,
  Input,
  InputGroup,
  VStack,
  InputLeftElement,
  Box,
  Text,
  Grid,
  GridItem,
  Select,
  Button,
  SimpleGrid,
  Card,
  CardBody,
  Image,
  Stack,
  Divider,
  CardFooter,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import React, { useEffect, useState } from 'react';
import data from '../assets/data.json';
import { LuBedSingle } from 'react-icons/lu';
import { BiBath } from 'react-icons/bi';

const Rent = () => {
  const [properties, setProperties] = useState(data.properties);
  const [propertyType, setPropertyType] = useState('');
  const [movedate, setMovedate] = useState(null);
  const [location, setLocation] = useState('');
  const [price, setPrice] = useState('');
  const [globalsearch, setGlobalsearch] = useState('');

  const filterByLocation = array => {
    if (location) {
      return array.filter(item => {
        const locationArray = item.location.split(/[, ]+/);
        let flag = false;
        for (let i of locationArray) {
          if (i.toLowerCase() === location.toLowerCase()) {
            flag = true;
            break;
          }
        }
        return flag;
      });
    } else {
      return array;
    }
  };

  const filterByProperty = array => {
    if (propertyType) {
      return array.filter(
        item => item.property_type.toLowerCase() === propertyType.toLowerCase()
      );
    } else return array;
  };

  const filterByMovedate = array => {
    if (movedate) {
      return array.filter(item => item.move_in_date === movedate);
    } else return array;
  };

  const filterByPrice = array => {
    if (price) {
      return array.filter(item => {
        const priceArray = price.split('-');
        return (
          item.price >= Number(priceArray[0]) &&
          item.price <= Number(priceArray[1])
        );
      });
    } else return array;
  };

  const handleSubmit = () => {
    let result = data.properties;
    result = filterByLocation(result);
    result = filterByMovedate(result);
    result = filterByPrice(result);
    result = filterByProperty(result);
    setProperties(result);
    setGlobalsearch('');
  };

  useEffect(() => {
    let result = data.properties;
    if (globalsearch) {
      result = result.filter(item => {
        const combinedString =
          item.name + ' ' + item.location + ' ' + item.property_type;
        const combinedArray = combinedString.split(/[, ]+/);
        let flag = false;
        for (let i of combinedArray) {
          if (i.toLowerCase() === globalsearch.toLowerCase()) {
            flag = true;
            break;
          }
        }
        return flag;
      });
    }
    setProperties(result);
  }, [globalsearch]);

  return (
    <>
      <Box>
        <VStack maxW={'container.lg'} mr={'auto'} ml={'auto'} mt={'20'}>
          <HStack w={'full'} justifyContent={'space-between'}>
            <Heading>Search properties to rent</Heading>

            <InputGroup w={'50'} size={'sm'} borderColor={'gray.200'}>
              <InputLeftElement
                pointerEvents="none"
                children={<SearchIcon color="gray.300" />}
                borderColor={'gray.200'}
              />
              <Input
                type="search"
                variant="outline"
                value={globalsearch}
                onChange={e => setGlobalsearch(e.target.value)}
                placeholder={`Search by property name, location, type`}
                borderRadius={'2px'}
                borderColor={'gray.200'}
              />
            </InputGroup>
          </HStack>

          <Grid
            templateColumns="repeat(5,1fr)"
            w={'full'}
            mt={'5'}
            p={'4'}
            bg="#F5F7ED"
            h={'24'}
          >
            <GridItem borderRight={'2px solid white'}>
              <VStack>
                <Text fontSize={'small'} color={'gray.500'}>
                  Location
                </Text>
                <InputGroup size={'sm'} border={'none'}>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<SearchIcon color="gray.300" />}
                    border={'none'}
                  />
                  <Input
                    type="text"
                    value={location}
                    placeholder={`USA`}
                    border={'none'}
                    onChange={e => setLocation(e.target.value)}
                  />
                </InputGroup>
              </VStack>
            </GridItem>
            <GridItem borderRight={'2px solid white'}>
              <VStack>
                <Text fontSize={'small'} color={'gray.500'}>
                  When
                </Text>
                <Input
                  type="date"
                  size={'sm'}
                  placeholder="Select movie-in date"
                  border={'none'}
                  onChange={e => setMovedate(e.target.value)}
                />
              </VStack>
            </GridItem>
            <GridItem borderRight={'2px solid white'}>
              <VStack>
                <Text fontSize={'small'} color={'gray.500'}>
                  Price
                </Text>
                <Select
                  placeholder="Select range"
                  onChange={e => setPrice(e.target.value)}
                  size={'sm'}
                  border={'none'}
                >
                  <option value="0-500">$0-$500</option>
                  <option value="501-1000">$501-$1000</option>
                  <option value="1001-5000">$1001-$5000</option>
                  <option value="5000-999999999">More than $5000</option>
                </Select>
              </VStack>
            </GridItem>
            <GridItem borderRight={'2px solid white'}>
              <VStack>
                <Text fontSize={'small'} color={'gray.500'}>
                  Property Type
                </Text>
                <Select
                  placeholder="All"
                  size={'sm'}
                  border={'none'}
                  onChange={e => setPropertyType(e.target.value)}
                >
                  <option value="House">House</option>
                  <option value="Apartment">Apartment</option>
                  <option value="Farmhouse">Farmhouse</option>
                  <option value="Studio">Studio</option>
                  <option value="Bungalow">Bungalow</option>
                  <option value="Cottage">Cottage</option>
                  <option value="Loft">Loft</option>
                  <option value="Penthouse">Penthouse</option>
                </Select>
              </VStack>
            </GridItem>
            <GridItem>
              <VStack mt="3.5">
                <Button colorScheme="purple" w={'8rem'} onClick={handleSubmit}>
                  Search
                </Button>
              </VStack>
            </GridItem>
          </Grid>

          <SimpleGrid spacing={1} templateColumns="repeat(3,1fr)" w={'full'}>
            {properties.map((item, index) => (
              <Card w="full" key={index}>
                <CardBody>
                  <Image
                    src={item.image_url}
                    alt={item.name}
                    borderRadius="lg"
                    boxSize={'full'}
                    h={'40'}
                    objectFit={'cover'}
                  />
                  <Stack spacing="2" pt="5" pl="5">
                    <Text color="purple" fontSize="xl" fontWeight={'bold'}>
                      ${item.price}
                      <Text
                        as="span"
                        fontSize={'sm'}
                        color={'gray.500'}
                        fontWeight={'normal'}
                      >
                        /month
                      </Text>
                    </Text>
                    <Heading size="md">{item.name}</Heading>
                    <Text color="gray.500" fontSize={'small'}>
                      {item.location}
                    </Text>
                  </Stack>
                </CardBody>
                <Divider color={'gray.100'} />
                <CardFooter w={'full'}>
                  <HStack justifyContent={'space-around'} w="full">
                    <HStack>
                      <LuBedSingle color="purple" />{' '}
                      <Text color="gray.500" fontSize={'small'}>
                        {item.beds} beds
                      </Text>
                    </HStack>

                    <HStack>
                      {' '}
                      <BiBath color="purple" />{' '}
                      <Text color="gray.500" fontSize={'small'}>
                        {item.bathrooms} bathrooms
                      </Text>
                    </HStack>
                  </HStack>
                </CardFooter>
              </Card>
            ))}
          </SimpleGrid>
        </VStack>
      </Box>
    </>
  );
};

export default Rent;
