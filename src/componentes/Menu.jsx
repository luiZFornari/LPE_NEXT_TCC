"use client";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Link from "next/link";
import { signIn, signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

function Menu() {
  const { data: session } = useSession();

  const tipo = session?.user?.tipo;

  return (
    <Navbar expand="lg" bg="dark" variant="dark" className="shadow-sm">
      <Container>
        <Link className="navbar-brand fw-bold" href={`/`}>
          Hardwaria{" "}
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link className="nav-link" href={`/`}>
              Home
            </Link>
            {session != null && (
              <NavDropdown title="Manutenções" id="basic-nav-dropdown">
                <Link className="dropdown-item" href={`/privado/configuracao`}>
                  Minhas Configurações
                </Link>
                {tipo === "A" && (
                  <Link className="dropdown-item" href={`/privado/games`}>
                    Games
                  </Link>
                )}
              </NavDropdown>
            )}
            <Link
              className="nav-link"
              href={`/privado/configuracao/recomendador`}
            >
              Gerar Configuração
            </Link>
            <Link className="nav-link" href={`/sobre`}>
              Sobre
            </Link>
          </Nav>

          <Nav>
            {session == null && (
              <Link className="nav-link" href={`/register`}>
                Registrar
              </Link>
            )}
            <NavDropdown
              title={session == null ? "Login" : session.user.name}
              id="user-nav-dropdown"
              align="end"
            >
              {session == null ? (
                <form action={signIn}>
                  <button type="submit" className="dropdown-item">
                    Login
                  </button>
                </form>
              ) : (
                <>
                  <Link className="dropdown-item" href={`/user`}>
                    Meus Dados
                  </Link>
                  <form action={() => signOut({ callbackUrl: "/" })}>
                    <button type="submit" className="dropdown-item">
                      Logout
                    </button>
                  </form>
                </>
              )}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Menu;
