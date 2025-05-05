// app/api/Job/route.ts
import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET() {
  try {
    const result = await pool.query("SELECT * FROM job");
    return NextResponse.json(result.rows);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch Job" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const query = `
      INSERT INTO job (
        id,title,post_date,category,organization,apply_link,notification_link,
        official_website,study_material,summary,start_date,last_date,exam_date,
        fee_last_date,admit_card_date,fee_general,fee_obc,fee_sc,fee_women,fee_men,
        free_fee,age_min,age_max,age_relaxation,pay_scale,salary_breakup,
        total_vacancies,vacancy_breakup,free_vacancy,qualification,eligiblity,
        selection_process,documents,how_to_apply,free_text_01,free_text_02,
        free_text_03,free_text_04,free_text_05
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15,
        $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28,
        $29, $30, $31, $32, $33, $34, $35, $36, $37, $38, $39
      ) RETURNING *
    `;
    const values = [
      data.id, data.title, data.postDate, data.category, data.organization,
      data.applyLink, data.notificationLink, data.officialWebsite,
      data.studyMaterial, data.summary, data.startDate, data.lastDate,
      data.examDate, data.feeLastDate, data.admitCardDate, data.feeGeneral,
      data.feeOBC, data.feeSC, data.feeWomen, data.feeMen, data.free_fee,
      data.ageMin, data.ageMax, data.ageRelaxation, data.payScale,
      data.salaryBreakup, data.totalVacancies, data.vacancyBreakup,
      data.free_vacancy, data.qualification, data.eligiblity,
      data.selectionProcess, data.documents, data.howToApply, data.freeText_01,
      data.freeText_02, data.freeText_03, data.freeText_04, data.freeText_05,
    ];
    const result = await pool.query(query, values);
    return NextResponse.json(result.rows[0]);
  } catch (error) {
    return NextResponse.json({ error: "Failed to create job" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const data = await request.json();
    const query = `
      UPDATE Job SET
        title = $2, post_date = $3, category = $4, organization = $5,
        apply_link = $6, notification_link = $7, official_website = $8,
        study_material = $9, summary = $10, start_date = $11, last_date = $12,
        exam_date = $13, fee_last_date = $14, admit_card_date = $15,
        fee_general = $16, fee_obc = $17, fee_sc = $18, fee_women = $19,
        fee_men = $20, free_fee = $21, age_min = $22, age_max = $23,
        age_relaxation = $24, pay_scale = $25, salary_breakup = $26,
        total_vacancies = $27, vacancy_breakup = $28, free_vacancy = $29,
        qualification = $30, eligiblity = $31, selection_process = $32,
        documents = $33, how_to_apply = $34, free_text_01 = $35,
        free_text_02 = $36, free_text_03 = $37, free_text_04 = $38,
        free_text_05 = $39
      WHERE id = $1 RETURNING *
    `;
    const values = [
      data.id, data.title, data.postDate, data.category, data.organization,
      data.applyLink, data.notificationLink, data.officialWebsite,
      data.studyMaterial, data.summary, data.startDate, data.lastDate,
      data.examDate, data.feeLastDate, data.admitCardDate, data.feeGeneral,
      data.feeOBC, data.feeSC, data.feeWomen, data.feeMen, data.free_fee,
      data.ageMin, data.ageMax, data.ageRelaxation, data.payScale,
      data.salaryBreakup, data.totalVacancies, data.vacancyBreakup,
      data.free_vacancy, data.qualification, data.eligiblity,
      data.selectionProcess, data.documents, data.howToApply, data.freeText_01,
      data.freeText_02, data.freeText_03, data.freeText_04, data.freeText_05,
    ];
    const result = await pool.query(query, values);
    if (result.rowCount === 0) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }
    return NextResponse.json(result.rows[0]);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update job" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    const result = await pool.query("DELETE FROM Job WHERE id = $1", [id]);
    if (result.rowCount === 0) {
      return NextResponse.json({ error: "Exam not job" }, { status: 404 });
    }
    return NextResponse.json({ message: "Job deleted" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete job" }, { status: 500 });
  }
}