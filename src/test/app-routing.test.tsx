import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";

import { AppRoutes } from "@/App";

function renderAt(path: string) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <AppRoutes />
    </MemoryRouter>,
  );
}

describe("App routing", () => {
  it("renders the landing page at /", () => {
    renderAt("/");
    expect(screen.getByText("設定航線與目標價，機票降價就通知你")).toBeInTheDocument();
  });

  it("renders the sign-in page", () => {
    renderAt("/sign-in");
    expect(screen.getByRole("heading", { name: "Sign in / 登入" })).toBeInTheDocument();
  });

  it("renders the sign-up page", () => {
    renderAt("/sign-up");
    expect(screen.getByRole("heading", { name: "Sign up / 註冊" })).toBeInTheDocument();
  });

  it("shows 404 for unknown paths", () => {
    renderAt("/nope");
    expect(screen.getByText("Page not found")).toBeInTheDocument();
  });
});
