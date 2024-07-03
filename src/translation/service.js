import i18n from './index';
import vi from './vi/vi.json';

const trans = (key, option) => {
    return key ? i18n.t(key, option) : '';
};

module.exports = { trans };
