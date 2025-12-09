# Introduction

Hi there! 👋 Welcome to the FedEx QA assignment. We're thrilled to have you here
and can't wait to see what you come up with for the assignment. Make sure to
carefully read the requirements, and if you need any assistance, feel free to
reach out to us at any time. We're here to help!

### Run the app
- Run `npm i` to install all the project dependencies.
- Run `npm start` to start the dev server.

# The Assessment
Feel free to showcase your impressive skills by thoroughly testing the app.
You have the freedom to automate test cases at **any** appropriate level. 
Be prepared though to motivate why you made the choices you made.

Detailed information is located in the [QA Engineer Assessment](./ASSESSMENT.MD)

### Important notes
- For e2e/integration testing, utilize **Playwright** with TypeScript as the automation tool.
- Maintainability and scalability are important.
- Design your test keeping the 'shift left' mindset.
- Undertaking this assignment obliges you to adhere to our confidentiality and data protection policies.s
  Disclosing any information to third parties (individuals, companies, or publicly on the internet) is strictly prohibited.

## Thank you
Thank you for taking our assignment.
We are looking forward to discuss your solution.


__________________________


Answers to the task questions and few general remarks:

<i>Considering the complexity of interactions in a microservices environment, 
how would you balance integrated end-to-end testing with the need to maintain rapid development and deployment cycles?</i>

* Prioritize core business in the e2e tests - make sure only most crucial flows are covered by these.
* Follow test automation pyramid - push tests down the pyramid, majority of the tests should be unit tests, then ensure integration test automation, then end to end tests as a cherry ontop of a cake.
* In a perfect world, run automation with every commit. So essentially, push automation left as far as possible. Perfect is impossible, but we should still strive for it :) 
* Safety nets on PROD - using feature flags, having clear logs and feedback

<i>Propose a robust strategy or implementation plan to manage potential inconveniences occasioned by downtime or inaccessibility of any external resource.</i>

* In general, I'm a firm follower of "testing to break software", not only check the requirements. Detecting any form of breaking changes as quickly as possible should be part of the testing scenarios.
* Early detection(automation, logs, etc.), finding potential workarounds so that customer is not completely affected by downtime.
* Mocking API - even if the external service is down, we can still continue writing tests and mocking particular scenarios, so that the development & testing part of the process is undisturbed by downtime. (I prepared tests recording HAR files with API calls and responses that can later be used as a template for mocking under har-setup folder. I left them as skipped to make sure no data is overriden during test runs)

<i>Consider generating concise and informative reports.</i>

* I tried naming each test and step in a way that will be clear and self-explanatory. Used built-in HTML reporter from Playwright (npx playwright test --reporter=html). I also suggest checking "merge files" in the settings of the reporter to group all the tests per browser and make it more clean.

<i>Document the key decisions and trade-offs.</i>

Adding extra classes in the FE code to help locating values within card. This alone made it much easier to validate specific results within the cards. 

Initially, I wanted to narrow down the UI tests to minimal checks and make bigger coverage on the API side, given that the app is based on an external API service. With different context and different task requirements, I think it would be a good idea. Currently I wrote basic checks for the sake of "showing off"

There will also be two tests failing, which is expected - even though requirements stated that it should be possible to clear results by searching for an empty search input, it is not currently the case.

I also added two scenarios on API side - one validating the behaviour for strings such as "*Jabba", which returns 400 and second one that validates behaviour for using numbers as search input. I did not want to assume any particular behaviour (assumptions are dangerous) so I wrote a validation based on a flow that worked, aka comparing results of an API call on people side vs planets side :) 

Potential TODOs after reviewing own code:
- extract localhost:4200 into environmental variable
- could create a method for searching for empty input
- would love to make tslint work and lint according to the config there

I tried to stick with the mentioned time window to test my skills, so I gave up on these for the sake of time. 
