import { conn } from "@/utils/database";
import { NextApiRequest, NextApiResponse } from "next";

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
	const {
		method,
		body,
		query: { id },
	} = req;

	switch (method) {
		case "GET":
			try {
				const text = "select * from guests g where id = $1";
				const values = [id];
				const result = await conn.query(text, values);

				if (result.rowCount === 0)
					return res.status(404).json({ message: "Task Not Found" });

				return res.json(result.rows[0]);
			} catch (error: any) {
				return res.status(400).json({ message: error.message });
			}
		case "PUT":
			try {
				const { title, description } = body;
				const text =
					"UPDATE tasks SET title = $1, description = $2 WHERE id = $3 RETURNING *";
				const values = [title, description, id];
				const result = await conn.query(text, values);
				return res.json(result.rows[0]);
			} catch (error: any) {
				return res.status(400).json({ message: error.message });
			}
			case "PATCH":
				try {
					const { guests, quantity, table_num, confirmed, cel1, cel2, gender, fisica, delivered } = body;
					const fields = [];
					const values = [];
					let index = 1;

					if (guests !== undefined) {
						fields.push(`guests = $${index++}`);
						values.push(guests);
					}
					if (quantity !== undefined) {
						fields.push(`quantity = $${index++}`);
						values.push(quantity);
					}
					if (table_num !== undefined) {
						fields.push(`table_num = $${index++}`);
						values.push(table_num);
					}
					if (confirmed !== undefined) {
						fields.push(`confirmed = $${index++}`);
						values.push(confirmed);
					}
					if (cel1 !== undefined) {
						fields.push(`cel1 = $${index++}`);
						values.push(cel1);
					}
					if (cel2 !== undefined) {
						fields.push(`cel2 = $${index++}`);
						values.push(cel2);
					}
					if (gender !== undefined) {
						fields.push(`gender = $${index++}`);
						values.push(gender);
					}
					if (fisica !== undefined) {
						fields.push(`fisica = $${index++}`);
						values.push(fisica);
					}
					if (delivered !== undefined) {
						fields.push(`delivered = $${index++}`);
						values.push(delivered);
					}

					if (fields.length === 0) {
						return res.status(400).json({ message: "No fields to update" });
					}

					const text = `UPDATE guests SET ${fields.join(", ")} WHERE id = $${index} RETURNING *`;
					values.push(id);

					const result = await conn.query(text, values);
					return res.json(result.rows[0]);
				} catch (error: any) {
					return res.status(400).json({ message: error.message });
				}
		case "DELETE":
			try {
				const text = "DELETE from guests g where id = $1 RETURNING *";
				const values = [id];
				const result = await conn.query(text, values);

				if (result.rowCount === 0)
					return res.status(404).json({ message: "Task Not Found" });

				return res.json(result.rows[0]);
			} catch (error: any) {
				return res.status(400).json({ message: error.message });
			}
		default:
			return res.status(400).json({ message: "Method are not supported" });
	}
};
