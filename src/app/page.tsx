"use client";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "../app/styles/Main.module.css"
import json_wedding_data from "../data/wedding-data.json"
import { Clock } from "@/components";

export default function Home() {
  const data = json_wedding_data;
  console.log(data);

  // sumar el total de invitados

  let totalInvitados = 0;
  data.guests.forEach((guest) => {
    totalInvitados += guest.quantity;
  });
  
  console.log(totalInvitados);

  return(
    <div className={styles.container}>
      <div className={styles.border}>
        <h1>This is the clock</h1>
        <Clock></Clock>
      </div>
    </div>
  )
}
