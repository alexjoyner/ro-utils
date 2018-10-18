import React from 'react';
import { shallow } from 'enzyme';
import { HeaderContainer } from '.';
import { colors } from '../../../colors';

describe('HeaderContainer component', () => {
  let component;
  beforeEach(() => {
    component = shallow(<HeaderContainer />);
  });
  it('Should render without exploding', () => {
    expect(component).toBeDefined();
  });
  it('Should match snapshot', () => {
    expect(component).toMatchSnapshot();
  });
  it('Should display apply correct positioning', () => {
    expect(component).toHaveStyleRule('z-index', '2');
    expect(component).toHaveStyleRule('position', 'fixed');
    expect(component).toHaveStyleRule('top', '0');
  });
  it('should accept a color prop', () => {
    const testHeight = shallow(<HeaderContainer color="primary" />);
    expect(testHeight).toHaveStyleRule('background-color', colors.primary);
  });
});
