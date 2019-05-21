** This script will buy 50 cent amazon gift cards 20x without requiring any input **
** The script is set to run every 50 seconds, shorter durations may prompt voided purchase **
** Does not work with amazon seller accounts as they require 2 factor authentication **
** This script stores your amazon login information and credit card to automate login **
** Amazon continues to change their CSS and security so minor tweaks are sometimes required **

Set Environmental Variables
MACOSX
Open Terminal
Run these commands
	touch ~/.bash_profile 
	open ~/.bash_profile
	save the file
	execute the file by typing source ~/.bash_profile

** SAMPLE **
export AMAZON_USERNAME=user
export AMAZON_PASSWORD=pass
export CCNUMB=1111111111


Install NodeJS
Download the buy.js
Download the runme script 
Configure the buy.js with the following information:
	value is preset to $.50
	variable names are set to the variables listed above
	find the amazon element name and replace ‘HERE_addCreditCardNumber’ with the proper value
		open element inspector when prompted to re-enter card number
		copy name of element that looks something like 
		0h_PU_CUS_1111111-1111-1234-1234-f6fe123456e_addCreditCardNumber
		paste that into line 67 and 69 
Configure runme script, currently set to run 20 times every 50 seconds
In terminal type ./runme in the folder that contains all of the files

