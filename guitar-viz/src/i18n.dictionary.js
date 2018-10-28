let lang = localStorage.getItem("itfLang") || "ru";

let dict = {
    "CHANGE_LANGUAGE": {
        "en": "Change language",
        "ru": "Изменить язык"
    },
    "ADD_NEW_DEVICE": {
        "en": "Add new device",
        "ru": "Добавить новое устройство"
    },
    "TO_ADD_NEW_DEVICE_YOU_SHOULD": {
        "en": "To add new device you should",
        "ru": "Чтобы добавить новое устройство, сначала нужно"
    },
    "TURN_ON_BLUETOOTH": {
        "en": "turn on Bluetooth",
        "ru": "включить Bluetooth"
    },
    "CLOSE": {
        "en": "Close",
        "ru": "Закрыть"
    },
    "NO_DEVICES_FOUND": {
        "en": "No devices found",
        "ru": "Не обнаружено ни одного устройства"
    },
    "REFRESH": {
        "en": "Refresh",
        "ru": "Обновить"
    },
    "TAP_ON_DEVICE_TO_CONNECT": {
        "en": "Tap on device to connect",
        "ru": "Нажмите на устройство, чтобы подключиться к нему"
    },
    "SUCCESSFULY_CONNECTED_TO": {
        "en": "Successfuly connected to",
        "ru": "Успешно подключено к"
    },
    "FAILED_TO_CONNECT_TO": {
        "en": "Failed to connect to",
        "ru": "Не удалось подключиться к"
    },
    "CHANGE_PASSWORD": {
        "en": "Change password",
        "ru": "Изменить пароль"
    },
    "OLD_PASSWORD": {
        "en": "Old password",
        "ru": "Старый пароль"
    },
    "ENTER_OLD_PASSWORD": {
        "en": "Enter old password",
        "ru": "Введите старый пароль"
    },
    "NEW_PASSWORD": {
        "en": "New password",
        "ru": "Новый пароль"
    },
    "ENTER_NEW_PASSWORD": {
        "en": "Enter new password",
        "ru": "Введите новый пароль"
    },
    "CONFIRM_PASSWORD": {
        "en": "Confirm password",
        "ru": "Подтвердите пароль"
    },
    "CONFIRM_NEW_PASSWORD": {
        "en": "Confirm new password",
        "ru": "Подтвердите новый пароль"
    },
    "ENTER_NEW_PASSWORD_ONE_MORE_TIME": {
        "en": "Enter new password one more time",
        "ru": "Введите новый пароль еще раз"
    },
    "PASSWORD_WAS_SUCCESSFULY_CHANGED": {
        "en": "Password was successfuly changed",
        "ru": "Пароль был успешно изменен"
    },
    "INCORRECT_OLD_PASSWORD": {
        "en": "Incorrect old password",
        "ru": "Неправильный старый пароль"
    },
    "INCORRECT_NEW_PASSWORD": {
        "en": "Incorrect new password",
        "ru": "Неправильный новый пароль"
    },
    "NEW_PASSWORD_SHOULD_NOT_BE_EQUAL_TO_OLD_PASSWORD": {
        "en": "New password should not be equal to old password",
        "ru": "Новый пароль не должен совпадать со старым паролем"
    },
    "INCORRECT_CONFIRMATION_OF_NEW_PASSWORD": {
        "en": "Incorrect confirmation of new password",
        "ru": "Неправильное подтверждение нового пароля"
    },
    "NEW_PASSWORDS_ARE_NOT_MATCHING": {
        "en": "New passwords are not matching",
        "ru": "Новый пароль и его подтверждение должны совпадать"
    },
    "CONNECTED_TO": {
        "en": "Connected to",
        "ru": "Подключено к"
    },
    "DISCONNECT": {
        "en": "Disconnect",
        "ru": "Отключиться"
    },
    "HELLO_USER_MY_OLD_FRIEND": {
        "en": "Hello {0}, my old friend...",
        "ru": "Привет {0}, мой старый друг..."
    },
    "DONT_HAVE_CONNECTED_DEVICES": {
        "en": "At the moment you don't have any device connected.",
        "ru": "На данный момент вы не подключены ни к какому устройству"
    },
    "TO_CONNECT_PRESS": {
        "en": "You can connect to device by clicking this",
        "ru": "Вы можете подключиться к устройству, нажав на эту"
    },
    "TO_THE_BUTTON": {
        "en": "button",
        "ru": "кнопку"
    },
    "USERNAME": {
        "en": "Username",
        "ru": "Имя пользователя"
    },
    "PASSWORD": {
        "en": "Password",
        "ru": "Пароль"
    },
    "LOGIN": {
        "en": "Login",
        "ru": "Войти"
    },
    "DONT_HAVE_ACCOUNT": {
        "en": "Don't have account yet? Press",
        "ru": "Еще нет аккаунта? Нажмите"
    },
    "SIGN_UP": {
        "en": "Sign up",
        "ru": "Зарегистрироваться"
    },
    "TO_REGISTER": {
        "en": "to register",
        "ru": "чтобы создать аккаунт"
    },
    "HOME": {
        "en": "Home",
        "ru": "Главная"
    },
    "SETTINGS": {
        "en": "Settings",
        "ru": "Настройки"
    },
    "LOGOUT": {
        "en": "Logout",
        "ru": "Выйти"
    },
    "LANGUAGE": {
        "en": "Language",
        "ru": "Язык"
    },
    "HAVE_ACCOUNT": {
        "en": "Have account? Press",
        "ru": "Уже есть аккаунт? Нажмите"
    },
    "TO_ENTER": {
        "en": "to enter",
        "ru": "чтобы перейти к форме входа"
    },
    "DEVICE_IS_NOT_CALIBRATED_PRESS": {
        "en": "Your device is not callibrated. Press",
        "ru": "Ваше устройство еще не откалибровано. Нажмите"
    },
    "TO_CALIBRATE": {
        "en": "to calibrate",
        "ru": "чтобы откалибровать"
    },
    "CALIBRATE_DEVICE": {
        "en": "Calibrate device",
        "ru": "Калибровать устройство"
    },
    "DEVICE_ALREADY_CALIBRATED_PRESS": {
        "en": "Your device is already callibrated. Press",
        "ru": "Ваше устройство уже откалибровано. Нажмите"
    },
    "TO_CALIBRATE_AGAIN": {
        "en": "if you want to calibrate device again",
        "ru": "если хотите еще раз откалибровать устройство"
    },
    "BRIGHTNESS": {
        "en": "Brightness",
        "ru": "Яркость"
    },
    "SENSITIVITY": {
        "en": "Sensitivity",
        "ru": "Чувствительность"
    },
    "DISABLED_DEVICE_OPTIONS": {
        "en": "You should calibrate device to change options",
        "ru": "Для того, чтобы изменить настройки устройства, нужно сначала откалибровать его"
    },
    "HELP": {
        "en": "Help",
        "ru": "Помощь"
    },
    "COMMON_SETTINGS": {
        "en": "Common settings",
        "ru": "Общие настройки"
    },
    "MODES": {
        "en": "Modes",
        "ru": "Режимы"
    },
    "VU_METER": {
        "en": "VU meter",
        "ru": "Измеритель уровня звука"
    },
    "GREEN_TO_RED": {
        "en": "Green to red",
        "ru": "От зеленого к красному"
    },
    "SMOOTH_RUNNING_RAINBOW": {
        "en": "Smooth running rainbow",
        "ru": "Плавно бегущая радуга"
    },
    "LIGHTSOUND_BY_FREQ": {
        "en": "Lightsound by frequencies",
        "ru": "Светомузыка по частотам"
    },
    "5_LINES": {
        "en": "5 symmetric lines",
        "ru": "5 полос симметрично"
    },
    "3_LINES": {
        "en": "3 lines",
        "ru": "3 полосы"
    },
    "1_LINE": {
        "en": "1 line",
        "ru": "1 полоса"
    },
    "STROBE_LIGHT": {
        "en": "Strobe light",
        "ru": "Стробоскоп"
    },
    "BACKLIGHT": {
        "en": "Backlight",
        "ru": "Подсветка"
    },
    "RUNNING_FREQ": {
        "en": "Running frequencies",
        "ru": "Бегущие частоты"
    },
    "SPECTRE_ANALYZER": {
        "en": "Spectre analyzer",
        "ru": "Анализатор спектра"
    },
    "3_FREQ": {
        "en": "3 frequencies",
        "ru": "3 частоты"
    },
    "LOW_FREQ": {
        "en": "Low frequencies",
        "ru": "Низкие частоты"
    },
    "MID_FREQ": {
        "en": "Middle frequencies",
        "ru": "Средние частоты"
    },
    "HIGH_FREQ": {
        "en": "High frequencies",
        "ru": "Высокие частоты"
    },
    "SUBMODES": {
        "en": "Submodes",
        "ru": "Подрежимы"
    },
    "ANIMATION_SMOOTHNESS": {
        "en": "Animation smoothness",
        "ru": "Плавность анимации"
    },
    "RAINBOW_SPEED": {
        "en": "Rainbow speed",
        "ru": "Скорость радуги"
    },
    "FLASH_SMOOTHNESS": {
        "en": "Flash smoothness",
        "ru": "Плавность вспышек"
    },
    "FLASH_FREQUENCY": {
        "en": "Flash frequency",
        "ru": "Частота вспышек"
    },
    "CONSTANT_COLOR": {
        "en": "Constant color",
        "ru": "Постоянный цвет"
    },
    "COLOR": {
        "en": "Color",
        "ru": "Цвет"
    },
    "SATURATION": {
        "en": "Saturation",
        "ru": "Насыщенность"
    },
    "SMOOTH_COLOR_CHANGING": {
        "en": "Smooth color changing",
        "ru": "Плавная смена цвета"
    },
    "SPEED": {
        "en": "Speed",
        "ru": "Скорость"
    },
    "RUNNING_RAINBOW": {
        "en": "Running rainbow",
        "ru": "Бегущая радуга"
    },
    "RAINBOW_STEP": {
        "en": "Rainbow step",
        "ru": "Шаг радуги"
    },
    "COLOR_STEP": {
        "en": "Color step",
        "ru": "Шаг цвета"
    }
};

export default {
    setLanguage(newLang) {
        lang = newLang;
        localStorage.setItem("itfLang", newLang);
    },
    getStr(key) {
        let obj = dict[key];
        if (!obj) return key;
        let str;
        if (obj[lang]) {
            str = obj[lang];
        } else {
            str = obj.en;
        }
        let phs = str.match(/\{ *\d+\ *}/g);
        if (phs) {
            let args = [...arguments].slice(1);
            phs.forEach(ph => {
                let i = +ph.slice(1, -1).trim();
                str = str.replace(new RegExp(ph.replace(/\{/g, "\\{").replace(/\}/g, "\\}"), "g"), args[i]);
            });
        }
        return str;
    }
};