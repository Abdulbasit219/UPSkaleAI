import { NextResponse } from "next/server";
import connectDB from "@/lib/connectDB";
import AuthUser from "@/models/AuthUser";

// Update company status (approve, reject, flag, suspend)
export async function PATCH(req, { params }) {
  await connectDB();

  try {
    const { id } = params;
    const { action } = await req.json();

    const company = await AuthUser.findById(id);

    if (!company || company.role !== "Company") {
      return NextResponse.json({ error: "Company not found" }, { status: 404 });
    }

    let updateData = {};

    switch (action) {
      case "approve":
        updateData = { status: "approved", verified: true };
        break;
      case "reject":
        updateData = { status: "rejected", verified: false };
        break;
      case "flag":
        updateData = { status: "flagged" };
        break;
      case "suspend":
        updateData = { status: "suspended" };
        break;
      default:
        return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }

    const updatedCompany = await AuthUser.findByIdAndUpdate(id, updateData, {
      new: true,
    }).select("-password");

    return NextResponse.json({
      success: true,
      message: `Company ${action}ed successfully`,
      company: updatedCompany,
    });
  } catch (error) {
    console.error("Error updating company:", error);
    return NextResponse.json(
      { error: "Failed to update company" },
      { status: 500 }
    );
  }
}

// Delete company
export async function DELETE(req, { params }) {
  await connectDB();

  try {
    const { id } = params;

    const company = await AuthUser.findById(id);

    if (!company || company.role !== "Company") {
      return NextResponse.json({ error: "Company not found" }, { status: 404 });
    }

    await AuthUser.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,
      message: "Company deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting company:", error);
    return NextResponse.json(
      { error: "Failed to delete company" },
      { status: 500 }
    );
  }
}
