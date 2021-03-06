const { Sequelize, Op } = require("sequelize");
const { Spending, Account } = require("../sequelize");

class SpendingRepository {
  async GetLastSumOfSpending(date, accountName) {
    return accountName
      ? await Spending.sum("value", {
          where: {
            date: { [Op.gt]: date },
            "$Account.name$": accountName,
          },
          include: [
            {
              model: Account,
              attributes: [],
            },
          ],
        })
      : await Spending.sum("value", {
          where: {
            date: { [Op.gt]: date },
          },
        });
  }

  async GetSpendingByCategory(accountName) {
    return accountName
      ? await Spending.findAll({
          attributes: [
            [Sequelize.fn("sum", Sequelize.col("value")), "value"],
            ["category", "id"],
          ],
          where: {
            "$Account.name$": accountName,
          },
          include: [
            {
              model: Account,
              attributes: [],
            },
          ],
          group: "category",
        })
      : await Spending.findAll({
          attributes: [
            [Sequelize.fn("sum", Sequelize.col("value")), "value"],
            ["category", "id"],
          ],
          group: "category",
        });
  }

  async GetHistory(accountName) {
    return accountName
      ? await Spending.findAll({
          attributes: { exclude: ["id", "AccountId"] },
          where: {
            "$Account.name$": accountName,
          },
          include: [
            {
              model: Account,
              attributes: [],
            },
          ],
        })
      : await Spending.findAll({
          attributes: [
            "name",
            "date",
            "value",
            "category",
            [Sequelize.col("Account.name"), "accountName"],
          ],
          include: [
            {
              model: Account,
              attributes: [],
            },
          ],
        });
  }

  async Add(spending) {
    let res = null;

    await Spending.create({
      name: spending.name,
      date: spending.date,
      value: spending.value,
      category: spending.category,
      AccountId: spending.accountId,
    }).then((x) => (res = x));

    await Account.update(
      { balance: Sequelize.literal(`balance - ${spending.value}`) },
      {
        where: {
          id: spending.accountId,
        },
      }
    );

    return res;
  }
}

module.exports = new SpendingRepository();
