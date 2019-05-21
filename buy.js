var os = require('os'); os.tmpDir = os.tmpdir;

var webdriver = require('selenium-webdriver'),
	Keys = webdriver.Key,
   	By = require('selenium-webdriver').By,
	until = require('selenium-webdriver').until;

var driver = new webdriver.Builder()
	.forBrowser('chrome')
	.build();

//set window size to allow gift card link visibility
driver.manage().window().setSize(1280,900);
driver.get('http://www.amazon.com/');

//cookies are unique per automated session, login is required every time
driver.findElement(By.linkText('Sign in')).click();
driver.findElement(By.id('ap_email')).sendKeys(process.env.AMAZON_USERNAME);
driver.findElement(By.id('ap_password')).sendKeys(process.env.AMAZON_PASSWORD);
driver.findElement(By.id('signInSubmit')).click();

//click through to reload giftcards
driver.switchTo().activeElement().sendKeys(Keys.END).then(function() {
    driver.sleep(1000);
});
driver.switchTo().activeElement().sendKeys(Keys.END);
driver.findElement(By.linkText('Reload Your Balance')).click();
driver.findElement(By.linkText('Gift Card Balance')).click();
driver.findElement(By.linkText('Reload Your Balance')).click();

//enter amount for the gift card
driver.findElement(By.id('asv-manual-reload-amount')).sendKeys('0.50');

//move to submit button and hit enter
driver.switchTo().activeElement().sendKeys(Keys.TAB).then(function() {
    driver.sleep(1000);
});
driver.switchTo().activeElement().sendKeys(Keys.TAB).then(function() {
    driver.sleep(1000);
});
driver.switchTo().activeElement().sendKeys(Keys.TAB).then(function() {
    driver.sleep(1000);
});
driver.switchTo().activeElement().sendKeys(Keys.ENTER).then(function() {
    driver.sleep(1000);
});

//first purchase does not require card validation
//second purchases and later require card validation
actualTitle = driver.getTitle();
if(actualTitle === "Thank you for reloading your balance")
{
		driver.quit();
}
else
{
		//validate card by moving back to credit card field
		driver.switchTo().activeElement().sendKeys(Keys.SHIFT, Keys.TAB).then(function() {
		    driver.sleep(1000);
		});
		driver.switchTo().activeElement().sendKeys(Keys.TAB).then(function() {
		    driver.sleep(1000);
		});

		//move to final submit button
		//ADD FIELD NAME HERE 
		driver.findElement(By.name('HERE_addCreditCardNumber')).sendKeys(process.env.CCNUMB);
		driver.sleep(1000);
		driver.findElement(By.name('HERE_addCreditCardNumber')).sendKeys(Keys.ENTER);
		driver.sleep(1000);
		driver.switchTo().activeElement().sendKeys(Keys.ENTER).then(function() {
		    driver.sleep(1000);
		});
		driver.switchTo().activeElement().sendKeys(Keys.TAB).then(function() {
		   driver.sleep(1000);
		});
		driver.switchTo().activeElement().sendKeys(Keys.TAB).then(function() {
		   driver.sleep(1000);
		});
		driver.switchTo().activeElement().sendKeys(Keys.ENTER).then(function() {
		   driver.sleep(1000);
		});

		//wait for confirmation and close
		driver.wait(until.titleIs('Thank you for reloading your balance'), 9000);
		driver.quit();
}
