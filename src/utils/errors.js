import i18n from 'i18next';

// err login
/*export const WRONG_PASS = i18n.t('errors.incorrect_email_or_password', 'Вы ввели неправильную почту или пароль.');
export const WRONG_TOKEN = i18n.t('errors.error_during_login', 'При авторизации произошла ошибка.');

// err user registration
export const CONFLICT_REG = i18n.t('errors.user_already_exists', 'Пользователь с таким email уже существует.');
export const ERR_REGISTER = i18n.t('errors.error_during_registration', 'При регистрации пользователя произошла ошибка.');
export const ERR_CHANGE_INFO = i18n.t('errors.error_during_data_change', 'При изменении данных произошла ошибка');
export const EMAIL = i18n.t('errors.enter_valid_email', 'Введите валидную почту(name@mail.com)');
export const PASS = i18n.t('errors.enter_password_of_min_8_chars', 'Введите пароль не менее 8 разных символов');
export const NAME = i18n.t('errors.enter_text_of_min_two_letters', 'Введите текст не менее двух букв');
export const PHONE = i18n.t('errors.enter_valid_phone_starting_with_plus', 'Введите валидный телефон начиная с +');

// err update profile
export const ERR_UPDATE = i18n.t('errors.error_during_profile_update', 'При обновлении профиля произошла ошибка.');*/


// err login
export function WRONG_PASS() {
    return i18n.t('errors.incorrect_email_or_password');
}
export function WRONG_TOKEN() {
    return i18n.t('errors.error_during_login');
}

// err user registration
export function CONFLICT_REG() {
    return i18n.t('errors.user_already_exists');
}
export function ERR_REGISTER() {
    return i18n.t('errors.error_during_registration');
}
export function ERR_CHANGE_INFO() {
    return i18n.t('errors.error_during_data_change');
}
export function EMAIL() {
    return i18n.t('errors.enter_valid_email');
}
export function PASS() {
    return i18n.t('errors.enter_password_of_min_8_chars');
}
export function NAME() {
    return i18n.t('errors.enter_text_of_min_two_letters');
}
export function PHONE() {
    return i18n.t('errors.enter_valid_phone_starting_with_plus');
}

// err update profile
export function ERR_UPDATE() {
    return i18n.t('errors.error_during_profile_update');
}

