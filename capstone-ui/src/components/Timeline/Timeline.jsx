// import * as React from "react";
import React, { useState } from "react";
import PostHeader from "../PostHeader/PostHeader";
import "./Timeline.css";

export default function Timeline() {
  return (
    <div className="timeline-component">
      {/* TODO for now just hardcode timeline but eventually map props array into PostHeader components*/}
      <PostHeader></PostHeader>
      <PostHeader></PostHeader>
      <PostHeader></PostHeader>
      <PostHeader></PostHeader>
    </div>
  );
}
