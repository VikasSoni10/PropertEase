import React from 'react';
import {
  Button,
  HStack,
  Heading,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { ChevronDownIcon } from '@chakra-ui/icons';

const Header = () => {
  return (
    <>
      <HStack
        justifyContent={'space-between'}
        h={'20'}
        borderBottom={'1px'}
        borderColor={'gray.100'}
        w='100%'
      >
        <HStack
          spacing={'6'}
          justifyContent={'space-between'}
          alignItems={'center'}
        >
          <Heading fontSize={'22'} ml={'10'} mr={'4'}>
            PropertEase
          </Heading>
          <Button
            variant={'ghost'}
          >
            <Link to={'/rent'}>Rent</Link>
          </Button>
          <Button variant={'ghost'}>
            <Link to={'/buy'}>Buy</Link>
          </Button>
          <Button variant={'ghost'}>
            <Link to={'/sell'}>Sell</Link>
          </Button>

          <Menu>
            <MenuButton
              as={Button}
              rightIcon={<ChevronDownIcon />}
              variant={'ghost'}
            >
              Manage Property
            </MenuButton>
            <MenuList>
              <MenuItem>Rent Agreement</MenuItem>
              <MenuItem>Generate Rent Receipt</MenuItem>
              <MenuItem>Office Leasing Assistance</MenuItem>
              <MenuItem>Tenant Verification</MenuItem>
              <MenuItem>Property Valuation</MenuItem>
            </MenuList>
          </Menu>

          <Menu>
            <MenuButton
              as={Button}
              rightIcon={<ChevronDownIcon />}
              variant={'ghost'}
            >
              Resources
            </MenuButton>
            <MenuList>
              <MenuItem>Blog</MenuItem>
              <MenuItem>News and Trends</MenuItem>
              <MenuItem>Advertise</MenuItem>
              <MenuItem>Payments</MenuItem>
              <MenuItem>Agent Finder</MenuItem>
            </MenuList>
          </Menu>
        </HStack>

        <HStack spacing={'3'} mr={'14'}>
          <Button
            colorScheme="purple"
            variant={'outline'}
            borderColor={'gray.200'}
          >
            <Link to={'/login'}>Login</Link>
          </Button>
          <Button colorScheme="purple">
            <Link to={'/signup'}>Sign up</Link>
          </Button>
        </HStack>
      </HStack>
    </>
  );
};

export default Header;
