import * as data from "../helpers/default_data.json"
import * as main_page from "../locators/main_page.json"
import * as result_page from "../locators/result_page.json"
import * as recovery_page from "../locators/recovery_password_page.json"

describe('Проверка авторизации', function () {

    beforeEach('Начало теста', function () {
        cy.visit('/');
        cy.get(main_page.fogot_pass_btn).should('have.css', 'color', 'rgb(0, 85, 152)');
        });
    afterEach('Конец теста', function () {
        cy.get(result_page.close).should('be.visible'); //Крестик виден пользователю
     });

    it('Верный логин и верный пароль', function () {
         cy.get(main_page.email).type(data.login); //Ввели верный логин
         cy.get(main_page.password).type(data.password); //Ввели верный пароль
         cy.get(main_page.login_button).click(); //Нажал войти

         cy.get(result_page.title).contains('Авторизация прошла успешно'); //Проверяю, что после авт. вижу текст
         cy.get(result_page.title).should('be.visible'); //Текст виден пользователю
     })

    it('Верный логин и неверный пароль', function () {
         cy.get(main_page.email).type(data.login); //Ввели верный логин
         cy.get(main_page.password).type('iLoveqastudio12'); //Ввели неверный пароль
         cy.get(main_page.login_button).click(); //Нажал войти

         cy.get(result_page.title).contains('Такого логина или пароля нет'); //Проверяю, что после авт. вижу текст
         cy.get(result_page.title).should('be.visible'); //Текст виден пользователю
     })

     it('Проверка, что в логине есть @', function () {
        cy.get(main_page.email).type('germandolnikov.ru'); //Ввели логин без @
        cy.get(main_page.password).type(data.password); //Ввели верный пароль
        cy.get(main_page.login_button).click(); //Нажал войти

        cy.get(result_page.title).contains('Нужно исправить проблему валидации'); //Проверяю, что после авт. вижу текст
        cy.get(result_page.title).should('be.visible'); //Текст виден пользователю
     })

     it('Проверка восстановления пароля', function () {
        cy.get(main_page.fogot_pass_btn).click(); //Нажимаю восстановить пароль

        cy.get(recovery_page.email).type(data.login); //Ввел почту для восстановления пароля
        cy.get(recovery_page.send_button).click(); //Нажал отправить код
        
        cy.get(result_page.title).contains('Успешно отправили пароль на e-mail'); //Проверяю текст
        cy.get(result_page.title).should('be.visible'); //Текст виден пользователю
     })

     it('Неверный логин и верный пароль', function () {
        cy.get(main_page.email).type('mars@yandex.ru'); //Ввели неверный логин
        cy.get(main_page.password).type(data.password); //Ввели верный пароль
        cy.get(main_page.login_button).click(); //Нажал войти

        cy.get(result_page.title).contains('Такого логина или пароля нет'); //Проверяю, что после авт. вижу текст
        cy.get(result_page.title).should('be.visible'); //Текст виден пользователю
    })

    it('Использование строчных букв в логине', function () {
        cy.get(main_page.email).type('GerMan@Dolnikov.ru'); //Использовали строчные буквы
        cy.get(main_page.password).type(data.password); //Ввели верный пароль
        cy.get(main_page.login_button).click(); //Нажал войти

        cy.get(result_page.title).contains('Такого логина или пароля нет'); //Проверяю, что после авт. вижу текст
        cy.get(result_page.title).should('be.visible'); //Текст виден пользователю
    })
})