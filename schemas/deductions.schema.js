const { currencySchema, yesNoSchema } = require('./utils.schema')

const rrspSchema = {
  rrspClaim: yesNoSchema(),
}

const rrspAmountSchema = {
  rrspAmount: currencySchema(),
}

const charitableDonationSchema = {
  charitableDonationClaim: yesNoSchema(),
}

const donationsAmountSchema = {
  donationsAmount: currencySchema(),
}

const politicalContributionSchema = {
  politicalContributionClaim: yesNoSchema(),
}

const politicalAmountSchema = {
  politicalProvincialAmount: currencySchema(),
  politicalFederalAmount: currencySchema(),
}

const medicalExpenseSchema = {
  medicalExpenseClaim: yesNoSchema(),
}

const medicalAmountSchema = {
  medicalAmount: currencySchema(),
}

const trilliumRentSchema = {
  trilliumRentClaim: yesNoSchema(),
}

const trilliumRentAmountSchema = {
  trilliumRentAmount: currencySchema(),
}

const trilliumPropertyTaxSchema = {
  trilliumPropertyTaxClaim: yesNoSchema(),
}

const trilliumPropertyTaxAmountSchema = {
  trilliumPropertyTaxAmount: currencySchema(),
}

const trilliumStudentResidenceSchema = {
  trilliumStudentResidence: yesNoSchema(),
}

const trilliumEnergySchema = {
  trilliumEnergyClaim: yesNoSchema(),
}

const trilliumEnergyAmountSchema = {
  trilliumEnergyAmount: currencySchema(),
}

const trilliumlongTermCareAmountSchema = {
  trilliumLongTermCareAmount: currencySchema(),
}

const climateActionIncentiveSchema = {
  climateActionIncentiveIsRural: yesNoSchema(),
}

module.exports = {
  climateActionIncentiveSchema,
  charitableDonationSchema,
  donationsAmountSchema,
  medicalExpenseSchema,
  medicalAmountSchema,
  politicalContributionSchema,
  politicalAmountSchema,
  rrspSchema,
  rrspAmountSchema,
  trilliumRentSchema,
  trilliumRentAmountSchema,
  trilliumPropertyTaxSchema,
  trilliumPropertyTaxAmountSchema,
  trilliumEnergySchema,
  trilliumEnergyAmountSchema,
  trilliumlongTermCareAmountSchema,
  trilliumStudentResidenceSchema,
}
